import { createClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/* Supabase client (lecture uniquement) */
/* ------------------------------------------------------------------ */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface ConfigListItem {
  id: number;
  nom: string;
  typeLabel: string;
}

/* ------------------------------------------------------------------ */
/* List */
/* ------------------------------------------------------------------ */

interface ListConfigsParams {
  page: number;
  pageSize: number;
  search?: string;
  configTypeId?: number;
}


export async function listConfigs({
 page,
  pageSize,
  search,
  configTypeId,
}: ListConfigsParams): Promise<{
  items: ConfigListItem[];
  totalPages: number;
}> {
let query = supabase
  .from("vw_config_view")
  .select(
    `
      config_id,
      config_nom,
      config_type,
      type_nom,
      lmod
    `,
    { count: "exact" }
  );

if (search) {
  query = query.or(
    `config_nom.ilike.%${search}%,type_nom.ilike.%${search}%`
  );
}

if (configTypeId) {
  query = query.eq("config_type", configTypeId);
}

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await query
    .order("config_nom")
    .range(from, to);

  if (error) {
    throw error;
  }

  const items: ConfigListItem[] =
    data?.map((row) => ({
      id: row.config_id,
      nom: row.config_nom,
      typeLabel: row.type_nom,
    })) ?? [];

  return {
    items,
    totalPages: count ? Math.ceil(count / pageSize) : 1,
  };
}
