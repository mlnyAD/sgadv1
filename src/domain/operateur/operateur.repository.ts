

// src/domain/operateur/operateur.repository.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { OperateurView } from "./operateur-types";
import { mapOperateurRowToView } from "./operateur.mapper";
import type { AuthenticatedOperateur } from "./authenticated-operateur.interface";
import { mapOperateurDbRowToAuthenticated } from "./operateur.mapper";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SELECT_OPERATEUR_VIEW } from "./operateur.select";
import type { OperateurRow } from "@/domain/_db/rows";


/* ------------------------------------------------------------------ */
/* LIST                                                               */
/* ------------------------------------------------------------------ */
 export async function listOperateurs(params: {
	page: number;
  pageSize: number;
  search?: string;
  actif?: boolean;   // ✅ ajouter
}) {
  const { page, pageSize, search, actif } = params;
	const supabase = await createSupabaseServerReadClient();

	let q = supabase
		.from("vw_operateur_view")
		.select(SELECT_OPERATEUR_VIEW, { count: "exact" });

	if (search) {
		q = q.ilike("oper_nom", `%${search}%`);
	}
	if (actif !== undefined) {
		q = q.eq("oper_actif", actif);
	}

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await q.range(from, to);
	if (error) throw new Error(error.message);

	const rows = (data ?? []) as unknown as OperateurRow[];

	//console.log("ListOperateur rows ", rows)
	return {
		data: rows.map(mapOperateurRowToView),
		total: count ?? 0,
	};
}

/* ------------------------------------------------------------------ */
/* READ                                                               */
/* ------------------------------------------------------------------ */
export async function getOperateurById(id: string): Promise<OperateurView | null> {
	const supabase = await createSupabaseServerReadClient();

	const { data, error } = await supabase
		.from("vw_operateur_view")
		.select(SELECT_OPERATEUR_VIEW)
		.eq("oper_id", id)
		.single();

	if (error || !data) return null;

	const row = data as unknown as OperateurRow;
	return mapOperateurRowToView(row);
}

/* ------------------------------------------------------------------ */
/* READ by email (optionnel)                                           */
/* ------------------------------------------------------------------ */
export async function getOperateurByEmail(email: string): Promise<OperateurView | null> {

	const supabase = await createSupabaseServerReadClient();

	const { data, error } = await supabase
		.from("vw_operateur_view")
		.select(SELECT_OPERATEUR_VIEW)
		.eq("oper_email", email)
		.maybeSingle();

	if (error) throw new Error(error.message);

	if (!data) return null;

	const row = data as unknown as OperateurRow;
	return mapOperateurRowToView(row);
}

/* ------------------------------------------------------------------ */
/* CREATE (table)                                                     */
/* ------------------------------------------------------------------ */
export async function createOperateur(operateur: OperateurView): Promise<void> {

	const supabase = await createSupabaseAdminClient();

	const { error } = await supabase.from("operateur").insert({
		oper_id: operateur.id,
		oper_email: operateur.email,
		oper_nom: operateur.nom,
		oper_prenom: operateur.prenom,
		oper_admin_sys: operateur.isAdminSys,          // ✅ nom DB
		oper_actif: operateur.actif,                   // ✅ nom DB
		must_change_pwd: operateur.mustChangePassword, // ✅ nom DB
	});

	if (error) throw new Error(error.message);
}

/* ------------------------------------------------------------------ */
/* UPDATE (table)                                                     */
/* - Ne touche pas must_change_pwd (onboarding / reset dédié)          */
/* ------------------------------------------------------------------ */
export async function updateOperateur(operateurId: string, operateur: OperateurView): Promise<void> {

	const supabase = await createSupabaseAdminClient();

	const { error } = await supabase
		.from("operateur")
		.update({
			oper_email: operateur.email,
			oper_nom: operateur.nom,
			oper_prenom: operateur.prenom,
			oper_admin_sys: operateur.isAdminSys,
			oper_actif: operateur.actif,
			// must_change_pwd volontairement NON modifié ici
		})
		.eq("oper_id", operateurId);

	if (error) throw new Error(error.message);
}

// --- SESSION / AUTHENTICATED OPERATEUR --------------------------------

export async function getAuthenticatedOperateurByUserId(
	userId: string
): Promise<AuthenticatedOperateur | null> {
	const supabase = await createSupabaseServerReadClient();

	const { data: operRowRaw, error: opError } = await supabase
		.from("vw_operateur_view")
		.select(SELECT_OPERATEUR_VIEW)
		.eq("oper_id", userId)
		.maybeSingle();

		//console.log("getAuthenticatedOperateurByUserId data, error", operRowRaw, opError)

	if (opError || !operRowRaw) return null;

	const operRow = operRowRaw as unknown as OperateurRow;

	// boolean | null => test strict
	if (operRow.oper_actif !== true) return null;

	let clientIds: string[] = [];

	if (operRow.oper_admin_sys !== true) {
		const { data: links, error: linksError } = await supabase
			.from("operateur_client")
			.select("clt_id")
			.eq("oper_id", operRow.oper_id as string);

		if (linksError) return null;

		clientIds = (links ?? []).map((l) => l.clt_id);
	}

	return mapOperateurDbRowToAuthenticated(operRow, clientIds);
}


