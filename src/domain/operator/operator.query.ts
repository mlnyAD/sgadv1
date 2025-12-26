import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { OperatorRow } from "./operator.types";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface ListOperatorsQueryParams {
  page: number;
  pageSize: number;
  search?: string;
  roleId?: number;
  active?: boolean;
}

/* ------------------------------------------------------------------ */
/* Query */
/* ------------------------------------------------------------------ */

export async function fetchOperatorRows({
  page,
  pageSize,
  search,
  roleId,
  active,
}: ListOperatorsQueryParams): Promise<{
  rows: OperatorRow[];
  totalPages: number;
}> {
  const supabase = await createSupabaseServerReadClient();


  let query = supabase
    .from("vw_operator_view")
    .select("*", { count: "exact" });

  /* -------------------- Filtres -------------------- */

  if (roleId !== undefined) {
    query = query.eq("role_id", roleId);
  }

  if (active !== undefined) {
    query = query.eq("active", active);
  }

  if (search) {
    query = query.or(
      `email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`
    );
  }

  /* -------------------- Pagination -------------------- */

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    rows: data ?? [],
    totalPages: count ? Math.ceil(count / pageSize) : 1,
  };
}
