/* ------------------------------------------------------------------ */
/* DB row (table ou vue brute)                                         */
/* ------------------------------------------------------------------ */

export interface CentreCoutDbRow {
	cc_id: string;
	clt_id: string;
	clt_nom?: string;

	famille_id: number;
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

	familleId: number;
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
	familleId: number;

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
	famille_id: number;

	cc_commentaires?: string | null;
	cc_actif: boolean;
}
