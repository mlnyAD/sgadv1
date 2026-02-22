

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SELECT_COMPTE_VIEW } from "./compte.select";

import type { CompteView } from "./compte-types";
import type { TroCompteRow, TroCompteInsert, TroCompteUpdate } from "@/domain/_db/rows";
import { mapCompteRowToView } from "./compte-mapper";
import { getCurrentClient } from "../session/current-client";

export async function getCompteById(params: {
  cltId: string;
  compteId: string;
}): Promise<CompteView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_tro_compte_view")
    .select(SELECT_COMPTE_VIEW)
    .eq("tro_cpt_id", params.compteId)
    .eq("tro_clt_id", params.cltId)
    .maybeSingle();

  if (error || !data) return null;

  return mapCompteRowToView(data as unknown as TroCompteRow);
}

export async function createCompte(payload: Omit<TroCompteInsert, "tro_clt_id">): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  // Ordre auto si absent (transaction simple)
  let ordre = (payload as any).tro_cpt_ordre ?? null;
  if (ordre == null) {
    const { data: maxRow, error: maxErr } = await supabase
      .from("tro_compte")
      .select("tro_cpt_ordre")
      .eq("tro_clt_id", current.cltId)
      .order("tro_cpt_ordre", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (maxErr) throw new Error(maxErr.message);

    const maxOrdre = (maxRow?.tro_cpt_ordre as number | null) ?? 0;
    ordre = maxOrdre + 1;
  }

  const { error } = await supabase.from("tro_compte").insert({
    ...payload,
    tro_cpt_ordre: ordre,
    tro_clt_id: current.cltId,
  });

  if (error) throw new Error(error.message);
}

export async function updateCompte(compteId: string, payload: TroCompteUpdate): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase
    .from("tro_compte")
    .update(payload)
    .eq("tro_cpt_id", compteId)
    .eq("tro_clt_id", current.cltId);

  if (error) throw new Error(error.message);
}

export async function listComptes(params: {
  cltId: string;
  page: number;
  pageSize: number;
  search?: string;
  actif?: boolean;
}): Promise<{ data: CompteView[]; total: number }> {
  const { cltId, page, pageSize, search, actif } = params;

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_tro_compte_view")
    .select(SELECT_COMPTE_VIEW, { count: "exact" })
    .eq("tro_clt_id", cltId)
    .order("tro_cpt_ordre")
    .order("tro_cpt_nom");

  if (search) query = query.ilike("tro_cpt_nom", `%${search}%`);
  if (actif !== undefined) query = query.eq("tro_cpt_actif", actif);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as unknown as TroCompteRow[];

  return {
    data: rows.map(mapCompteRowToView),
    total: count ?? 0,
  };
}

export async function listCompteOptions(params: {
  cltId: string;
  actifOnly?: boolean;
}): Promise<TroCompteRow[]> {
  const supabase = await createSupabaseServerReadClient();

  let q = supabase
    .from("vw_tro_compte_view")
    .select("tro_cpt_id,tro_cpt_nom,tro_cpt_actif")
    .eq("tro_clt_id", params.cltId)
    .order("tro_cpt_nom", { ascending: true });

  if (params.actifOnly) q = q.eq("tro_cpt_actif", true);

  const { data, error } = await q;
  if (error) throw new Error(error.message);

  return (data ?? []) as unknown as TroCompteRow[];
}

export async function softDeleteCompte(compteId: string): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase
    .from("tro_compte")
    .update({ tro_cpt_actif: false } as Partial<TroCompteUpdate>)
    .eq("tro_cpt_id", compteId)
    .eq("tro_clt_id", current.cltId);

  if (error) throw new Error(error.message);
}