

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SELECT_SOCIETE_VIEW } from "./societe.select";

import type { SocieteView } from "./societe-types";
import type { SocieteRow, SocieteInsert, SocieteUpdate } from "@/domain/_db/rows";
import { mapSocieteRowToView } from "./societe-mapper";
import { getCurrentClient } from "../session/current-client";

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

export async function createSociete(payload: Omit<SocieteInsert, "clt_id">): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  const insertPayload: SocieteInsert = {
    ...payload,
    clt_id: current.cltId,
  };

  const { error } = await supabase.from("societe").insert(insertPayload);
  if (error) throw new Error(error.message);
}

export async function updateSociete(societeId: string, payload: SocieteUpdate): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("societe")
    .update(payload)
    .eq("soc_id", societeId)
    .eq("clt_id", current.cltId);

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

export async function listSocietesForInvoice(params: {
  cltId: string;
  invType: 1 | 2; // 1 sales / 2 purchase
}): Promise<SocieteRow[]> {
  const supabase = await createSupabaseServerReadClient();

  let q = supabase
    .from("vw_societe_view")
    .select("soc_id,soc_nom,soc_client,soc_fournisseur")
    .eq("clt_id", params.cltId)
    .order("soc_nom");

  if (params.invType === 1) q = q.eq("soc_client", true);
  if (params.invType === 2) q = q.eq("soc_fournisseur", true);

  const { data, error } = await q;
  if (error) throw new Error(error.message);

  return (data ?? []) as unknown as SocieteRow[];
}