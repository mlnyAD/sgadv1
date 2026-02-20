

// src/domain/centre-cout/centre-cout-repository.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

import { getFamilleById } from "./centre-cout-familles.catalog";
import { mapCentreCoutRowToView } from "./centre-cout-mapper";
import { SELECT_CENTRE_COUT_VIEW } from "./centre-cout.select";

import type { CentreCoutView } from "./centre-cout-types";
import type { CentreCoutRow, CentreCoutInsert, CentreCoutUpdate } from "@/domain/_db/rows";
import { PostgrestError } from "@supabase/supabase-js";
import { getCurrentClient } from "../session/current-client";

export type CentreCoutViewRow = {
  cc_id: string | null;
  cc_code: string | null;
  cc_libelle: string | null;
  cc_actif: boolean | null;
  clt_id: string | null;
  famille_id: number | null;
};

function enrichFamille(view: CentreCoutView): CentreCoutView {
	return {
		...view,
		familleLibelle: getFamilleById(view.familleId)?.libelle ?? "—",
	};
}

/* ------------------------------------------------------------------ */
/* READ                                                               */
/* ------------------------------------------------------------------ */
export async function getCentreCoutById(params: {
	cltId: string;
	centreCoutId: string;
}): Promise<CentreCoutView | null> {
	const supabase = await createSupabaseServerReadClient();

	const { data, error } = await supabase
		.from("vw_centre_cout_view")
		.select(SELECT_CENTRE_COUT_VIEW)
		.eq("cc_id", params.centreCoutId)
		.eq("clt_id", params.cltId)
		.maybeSingle();

	if (error || !data) return null;

	const row = data as unknown as CentreCoutRow;
	return enrichFamille(mapCentreCoutRowToView(row));
}

/* ------------------------------------------------------------------ */
/* CREATE                                                             */
/* ------------------------------------------------------------------ */
export async function createCentreCout(
  payload: Omit<CentreCoutInsert, "clt_id">
): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  const insertPayload: CentreCoutInsert = {
    ...payload,
    clt_id: current.cltId,
  };

  const { error } = await supabase.from("centre_cout").insert(insertPayload);
  if (error) throw new Error(error.message);
}

/* ------------------------------------------------------------------ */
/* UPDATE                                                             */
/* ------------------------------------------------------------------ */
export async function updateCentreCout(centreCoutId: string, payload: CentreCoutUpdate): Promise<void> {

  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("centre_cout")
    .update(payload)
    .eq("cc_id", centreCoutId)
    .eq("clt_id", current.cltId);

 if (error) {
  const meta = `${error.message} ${JSON.stringify((error as PostgrestError).details ?? {})}`;

  if (meta.includes("centre_cout_clt_id_cc_code_key")) {
    const code = payload.cc_code ?? "—";
    throw new Error(`Ce code de centre de coût existe déjà pour ce client : ${code}`);
  }

  throw new Error(error.message);
}

}

/* ------------------------------------------------------------------ */
/* LIST                                                               */
/* ------------------------------------------------------------------ */
export async function listCentreCouts(params: {
	cltId: string;
	page: number;
	pageSize: number;
	search?: string;
	actif?: boolean;
}): Promise<{ data: CentreCoutView[]; total: number }> {
	const { cltId, page, pageSize, search, actif } = params;

	const supabase = await createSupabaseServerReadClient();

	let query = supabase
		.from("vw_centre_cout_view")
		.select(SELECT_CENTRE_COUT_VIEW, { count: "exact" })
		.eq("clt_id", cltId)
		.order("cc_code");

	if (search) query = query.ilike("cc_libelle", `%${search}%`);
	if (actif !== undefined) query = query.eq("cc_actif", actif);

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await query.range(from, to);
	if (error) throw new Error(error.message);

	const rows = (data ?? []) as unknown as CentreCoutRow[];
	return {
		data: rows.map(mapCentreCoutRowToView).map(enrichFamille),
		total: count ?? 0,
	};
}

export async function listCentreCoutOptions(params: {
  cltId: string;
}): Promise<CentreCoutRow[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_centre_cout_view")
    .select("cc_id,cc_code,cc_libelle")
    .eq("clt_id", params.cltId)
    .order("cc_code");

  if (error) throw new Error(error.message);

  return (data ?? []) as unknown as CentreCoutRow[];
}

export async function listCentresCout(params: { cltId: string; actifOnly?: boolean }) {
  const supabase = await createSupabaseServerReadClient();

  let q = supabase
    .from("vw_centre_cout_view")
    .select("cc_id,cc_code,cc_libelle,cc_actif,clt_id,famille_id")
    .eq("clt_id", params.cltId)
    .order("cc_code", { ascending: true });

  if (params.actifOnly) q = q.eq("cc_actif", true);

  const { data, error } = await q;
  if (error) throw new Error(error.message);

  return (data ?? []) as unknown as CentreCoutViewRow[];
}