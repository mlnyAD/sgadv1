/* ------------------------------------------------------------------ */
/* DB row (table ou vue brute)                                         */
/* ------------------------------------------------------------------ */

import { CentreCoutFamilleId } from "./centre-cout-familles.catalog";

export interface CentreCoutDbRow {
	cc_id: string;
	clt_id: string;
	clt_nom?: string;

	famille_id: CentreCoutFamilleId;
	cc_code: string;
	cc_libelle: string;
	cc_actif: boolean;

	cc_commentaires?: string | null;
}

/* ------------------------------------------------------------------ */
/* View model (projection UI)                                          */
/* ------------------------------------------------------------------ */

export interface CentreCoutView {
	id: string;

	code: string;
	libelle: string;

	clientId: string;
	clientNom?: string | null;

	familleId: CentreCoutFamilleId;
	familleLibelle?: string;

	commentaires?: string | null;
	actif: boolean;
}

/* ------------------------------------------------------------------ */
/* UI form model                                                       */
/* ------------------------------------------------------------------ */

export interface CentreCoutFormValues {
	code: string;
	libelle: string;

	clientId: string;
	familleId: CentreCoutFamilleId;

	commentaires?: string | null;
	actif: boolean;
}

/* ------------------------------------------------------------------ */
/* Persistence payload (table strict)                                  */
/* ------------------------------------------------------------------ */

export interface CentreCoutPersistencePayload {
	cc_code: string;
	cc_libelle: string;

	clt_id: string;
	famille_id: CentreCoutFamilleId;

	cc_commentaires?: string | null;
	cc_actif: boolean;
}
