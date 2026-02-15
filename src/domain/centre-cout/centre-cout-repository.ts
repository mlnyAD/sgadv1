

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
export async function createCentreCout(params: {
	cltId: string;
	payload: Omit<CentreCoutInsert, "clt_id">;
}): Promise<void> {
	const supabase = await createSupabaseAdminClient();

	const insertPayload: CentreCoutInsert = {
		...params.payload,
		clt_id: params.cltId,
	};

	const { error } = await supabase.from("centre_cout").insert(insertPayload);
	if (error) {
		const pg = error as PostgrestError;

		// Postgres unique violation
		if (pg.code === "23505" || pg.message.includes("duplicate key")) {
			const meta = `${pg.details ?? ""} ${pg.hint ?? ""} ${pg.message ?? ""}`;
			if (meta.includes("centre_cout_clt_id_cc_code_key")) {
				throw new Error(`Ce code de centre de coût existe déjà pour ce client : ${insertPayload.cc_code}`);
			}
			throw new Error("Ce code de centre de coût existe déjà pour ce client.");
		}

		throw new Error(error.message);
	}
}

/* ------------------------------------------------------------------ */
/* UPDATE                                                             */
/* ------------------------------------------------------------------ */
export async function updateCentreCout(params: {
	cltId: string;
	centreCoutId: string;
	payload: CentreCoutUpdate;
}): Promise<void> {
	const supabase = await createSupabaseAdminClient();

	const { error } = await supabase
		.from("centre_cout")
		.update(params.payload)
		.eq("cc_id", params.centreCoutId)
		.eq("clt_id", params.cltId);

	if (error) {
		const pg = error as PostgrestError;

		if (pg.code === "23505" || pg.message.includes("duplicate key")) {
			const meta = `${pg.details ?? ""} ${pg.hint ?? ""} ${pg.message ?? ""}`;

			if (meta.includes("centre_cout_clt_id_cc_code_key")) {
				// payload.cc_code peut être undefined selon le type Update
				const code = (params.payload as { cc_code?: string }).cc_code ?? "—";
				throw new Error(`Ce code de centre de coût existe déjà pour ce client : ${code}`);
			}

			throw new Error("Ce code de centre de coût existe déjà pour ce client.");
		}
		 throw new Error(pg.message);
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