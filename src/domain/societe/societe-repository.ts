

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import {
	SocietePersistencePayload,
	SocieteView,
} from "./societe-types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/* ------------------------------------------------------------------ */
/* READ                                                               */
/* ------------------------------------------------------------------ */
export async function getSocieteById(
	id: string
): Promise<SocieteView | null> {

	const supabase = await createSupabaseServerReadClient();

	const { data, error } = await supabase
		.from("vw_societe_view")
		.select("*")
		.eq("soc_id", id)
		.single();

	if (error || !data) {
		return null;
	}

	//console.log("getSocieteById data ", data)
	return data as SocieteView;
}

/* ------------------------------------------------------------------ */
/* CREATE                                                             */
/* ------------------------------------------------------------------ */
export async function createSociete(
	payload: SocietePersistencePayload
): Promise<void> {

	const supabase = await createSupabaseAdminClient();

	const { error } = await supabase
		.from("societe")
		.insert(payload);

	if (error) {
		console.error("🔥 [REPO] Supabase error", error);
		throw new Error(error.message);
	}
}

/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export async function updateSociete(
	societeId: string,
	payload: SocietePersistencePayload
): Promise<void> {
	const supabase = await createSupabaseAdminClient();

	//console.log("SaveCenreCout, payload = ", payload)

	const { data, error } = await supabase
		.from("societe")
		.update(payload)
		.eq("soc_id", societeId)
		.select("*");

	console.log("UPDATE DEBUG", { data, error });

	if (error) {
		throw new Error(error.message);
	}
}

/* ------------------------------------------------------------------ */
/* LIST                                                               */
/* ------------------------------------------------------------------ */
export async function listSocietes(params: {
	page: number;
	pageSize: number;
	search?: string;
	client?: boolean;
	fournisseur?: boolean;
}) {
	const { page, pageSize, search, client, fournisseur } = params;

	const supabase = await createSupabaseServerReadClient();

	let query = supabase
		.from("vw_societe_view")
		.select("*", { count: "exact" });

	if (search) {
		query = query.ilike("soc_code", `%${search}%`);
	}

	if (client !== undefined) {
		query = query.eq("soc_client", client);
	}

	if (fournisseur !== undefined) {
		query = query.eq("soc_fournisseur", fournisseur);
	}

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await query.range(from, to);

	if (error) {
		throw new Error(error.message);
	}

	return {
		data: data,
		total: count ?? 0,
	};
}
