

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SELECT_SOCIETE_VIEW } from "./societe.select";

import type { SocieteView } from "./societe-types";
import type { SocieteRow, SocieteInsert, SocieteUpdate } from "@/domain/_db/rows";
import { mapSocieteRowToView } from "./societe-mapper";

export async function getSocieteById(params: {
  cltId: string;
  societeId: string;
}): Promise<SocieteView | null> {

  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_societe_view")
    .select(SELECT_SOCIETE_VIEW)
    .eq("soc_id", params.societeId)
    .eq("clt_id", params.cltId)
    .maybeSingle();

    //console.log("getSocieteById error, data, societeId", error, data, params.societeId)

  if (error || !data) return null;

  return mapSocieteRowToView(data as unknown as SocieteRow);
}

export async function createSociete(payload: SocieteInsert): Promise<void> {
  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase.from("societe").insert(payload);
  if (error) throw new Error(error.message);
}

export async function updateSociete(societeId: string, payload: SocieteUpdate): Promise<void> {
  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase.from("societe").update(payload).eq("soc_id", societeId);
  if (error) throw new Error(error.message);
}

export async function listSocietes(params: {
  cltId: string;
  page: number;
  pageSize: number;
  search?: string;
  client?: boolean;
  fournisseur?: boolean;
}): Promise<{ data: SocieteView[]; total: number }> {
  const { cltId, page, pageSize, search, client, fournisseur } = params;

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_societe_view")
    .select(SELECT_SOCIETE_VIEW, { count: "exact" })
    .eq("clt_id", cltId)
    .order("soc_nom");

  if (search) query = query.ilike("soc_nom", `%${search}%`);
  if (client !== undefined) query = query.eq("soc_client", client);
  if (fournisseur !== undefined) query = query.eq("soc_fournisseur", fournisseur);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as unknown as SocieteRow[];

  return {
    data: rows.map(mapSocieteRowToView),
    total: count ?? 0,
  };
}