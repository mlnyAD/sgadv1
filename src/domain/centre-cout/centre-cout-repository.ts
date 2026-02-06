

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { getFamilleById } from "./centre-cout-familles.catalog";
import {
	CentreCoutPersistencePayload,
	CentreCoutView,
} from "./centre-cout-types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/* ------------------------------------------------------------------ */
/* READ                                                               */
/* ------------------------------------------------------------------ */
export async function getCentreCoutById(
	id: string
): Promise<CentreCoutView | null> {

	const supabase = await createSupabaseServerReadClient();

	const { data, error } = await supabase
		.from("vw_centre_cout_view")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !data) {
		return null;
	}

	//console.log("getCentreCoutById data ", data)
	return data as CentreCoutView;
}

/* ------------------------------------------------------------------ */
/* CREATE                                                             */
/* ------------------------------------------------------------------ */
export async function createCentreCout(
	payload: CentreCoutPersistencePayload
): Promise<void> {


	const supabase = await createSupabaseAdminClient();

	const { error } = await supabase
		.from("centre_cout")
		.insert(payload);

	if (error) {
		console.error("🔥 [REPO] Supabase error", error);
		throw new Error(error.message);
	}
}

/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export async function updateCentreCout(
	centreCoutId: string,
	payload: CentreCoutPersistencePayload
): Promise<void> {
	const supabase = await createSupabaseAdminClient();

	//console.log("SaveCenreCout, payload = ", payload)

	const { data, error } = await supabase
		.from("centre_cout")
		.update(payload)
		.eq("cc_id", centreCoutId)
		.select("*");

	console.log("UPDATE DEBUG", { data, error });

	if (error) {
		throw new Error(error.message);
	}
}

/* ------------------------------------------------------------------ */
/* LIST                                                               */
/* ------------------------------------------------------------------ */
export async function listCentreCouts(params: {
	page: number;
	pageSize: number;
	search?: string;
	actif?: boolean;
}) {
	const { page, pageSize, search, actif } = params;

	const supabase = await createSupabaseServerReadClient();

	let query = supabase
		.from("vw_centre_cout_view")
		.select("*", { count: "exact" });

	if (search) {
		query = query.ilike("centre_cout_libelle", `%${search}%`);
	}

	if (actif !== undefined) {
		query = query.eq("actif", actif);
	}

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await query.range(from, to);

	if (error) {
		throw new Error(error.message);
	}

	//console.log("listCentreCouts ", data, error)
	const enriched = (data ?? []).map(cc => ({
		...cc,
		familleLibelle:
			getFamilleById(cc.familleId)?.libelle ?? "—",
	}));

	return {
		data: enriched ?? [],
		total: count ?? 0,
	};
}
