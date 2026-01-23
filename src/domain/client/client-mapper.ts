

// src/domain/client/client.mapper.ts

import { ClientUI } from "./client-types";
import { ClientDbRow } from "./client-types";


/* ------------------------------------------------------------------
   CREATE
   ------------------------------------------------------------------ */
export function mapClientUIToDbCreate(
	ui: ClientUI,
) {
	return {
		client_nom: ui.nom,
		client_code: ui.code,
		adresse: ui.adresse ?? null,
		code_postal: ui.codePostal ?? null,
		ville: ui.ville ?? null,
		pays: ui.pays ?? null,
		email: ui.email ?? null,
		telephone: ui.telephone ?? null,
		actif: ui.actif,
	};
}

/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export function mapClientUIToDbUpdate(
	ui: ClientUI
) {
	return {
		client_id: ui.id,
		client_nom: ui.nom,
		client_code: ui.code,
		adresse: ui.adresse ?? null,
		code_postal: ui.codePostal ?? null,
		ville: ui.ville ?? null,
		pays: ui.pays ?? null,
		email: ui.email ?? null,
		telephone: ui.telephone ?? null,
		actif: ui.actif,
	};
}


/* ------------------------------------------------------------------
   DB -> UI (lecture)
   ------------------------------------------------------------------ */

export function mapClientDbToUI(
	row: ClientDbRow
): ClientUI {
	return {
		id: row.client_id,
		nom: row.client_nom,
		code: row.client_code,
		adresse: row.adresse,
		codePostal: row.code_postal,
		ville: row.ville,
		pays: row.pays,
		email: row.email,
		telephone: row.telephone,
		actif: row.actif,
	};
}
