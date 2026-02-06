

/* ------------------------------------------------------------------ */
/* DB row (table ou vue brute)                                        */
/* ------------------------------------------------------------------ */

export interface ExerciceDbRow {
	exer_id: string;

	clt_id: string;

	exer_code: string;
	exer_debut: Date;
	exer_fin: Date;
	exer_actif: boolean;
	exer_commentaires?: string | null;
}

/* ------------------------------------------------------------------ */
/* View model (projection UI)                                         */
/* ------------------------------------------------------------------ */

export interface ExerciceView {
	id: string;

	cltId: string;
	cltNom?: string | null;

	code: string;

	debut: Date;
	fin: Date;

	actif: boolean;
	commentaires?: string | null;

}

/* ------------------------------------------------------------------ */
/* UI form model                                                       */
/* ------------------------------------------------------------------ */

export interface ExerciceFormValues {

	cltId: string;

	code: string;

	debut: string; // YYYY-MM-DD
  	fin: string;   // YYYY-MM-DD

	actif: boolean;
	commentaires?: string | null;
}

/* ------------------------------------------------------------------ */
/* Persistence payload (table strict)                                  */
/* ------------------------------------------------------------------ */

export interface ExercicePersistencePayload {

	clt_id: string;

	exer_code: string;

	exer_debut: Date;
	exer_fin: Date;

	exer_actif: boolean;
	exer_commentaires?: string | null;
}
