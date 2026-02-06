

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import {
	ExercicePersistencePayload,
	ExerciceView,
} from "./exercice-types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/* ------------------------------------------------------------------ */
/* READ                                                               */
/* ------------------------------------------------------------------ */
export async function getExerciceById(
	id: string
): Promise<ExerciceView | null> {

	const supabase = await createSupabaseServerReadClient();

	const { data, error } = await supabase
		.from("vw_exercice_view")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !data) {
		return null;
	}

	//console.log("getExerciceById data ", data)
	return data as ExerciceView;
}

/* ------------------------------------------------------------------ */
/* CREATE                                                             */
/* ------------------------------------------------------------------ */
export async function createExercice(
	payload: ExercicePersistencePayload
): Promise<void> {

	/*console.log("🔥 [REPO] createExercice payload", payload, {
		types: {
			client_id: typeof payload.client_id,
			famille_id: typeof payload.famille_id,
		},
	});*/
	const supabase = await createSupabaseAdminClient();

	const { error } = await supabase
		.from("exercice")
		.insert(payload);

	if (error) {
		console.error("🔥 [REPO] Supabase error", error);
		throw new Error(error.message);
	}
}

/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export async function updateExercice(
	exerciceId: string,
	payload: ExercicePersistencePayload
): Promise<void> {
	const supabase = await createSupabaseAdminClient();

	//console.log("SaveCenreCout, payload = ", payload)

	const { data, error } = await supabase
		.from("exercice")
		.update(payload)
		.eq("exer_id", exerciceId)
		.select("*");

	console.log("UPDATE DEBUG", { data, error });

	if (error) {
		throw new Error(error.message);
	}
}

/* ------------------------------------------------------------------ */
/* LIST                                                               */
/* ------------------------------------------------------------------ */
export async function listExercices(params: {
	page: number;
	pageSize: number;
	search?: string;
	actif?: boolean;
}) {
	const { page, pageSize, search, actif } = params;

	const supabase = await createSupabaseServerReadClient();

	let query = supabase
		.from("vw_exercice_view")
		.select("*", { count: "exact" });

	if (search) {
		query = query.ilike("exer_code", `%${search}%`);
	}

	if (actif !== undefined) {
		query = query.eq("exer_actif", actif);
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
