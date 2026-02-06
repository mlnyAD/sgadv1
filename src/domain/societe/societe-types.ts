

/* ------------------------------------------------------------------ */
/* DB row (table ou vue brute)                                         */
/* ------------------------------------------------------------------ */

export interface SocieteDbRow {
	soc_id: string;

	clt_id: string;

	soc_nom: string;
	soc_code: string;
	soc_adresse: string;
	soc_ville: string;
	soc_pays: string;
	soc_code_postal: string;
	soc_telephone: string;

	soc_siren: string;

	soc_client: boolean;
	soc_fournisseur: boolean;
}

/* ------------------------------------------------------------------ */
/* View model (projection UI)                                          */
/* ------------------------------------------------------------------ */

export interface SocieteView {
	id: string;

	cltId: string;
	cltNom?: string | null;

	nom: string;
	code: string;

	adresse: string;
	ville: string;
	codePostal: string;
	pays: string;
	telephone: string;

	siren: string;

	client: boolean;
	fournisseur: boolean;

}

/* ------------------------------------------------------------------ */
/* UI form model                                                       */
/* ------------------------------------------------------------------ */

export interface SocieteFormValues {
	id: string;

	cltId: string;

	nom: string;
	code: string;

	adresse: string;
	ville: string;
	pays: string;
	codePostal: string;
	telephone: string;

	siren: string;

	client: boolean;
	fournisseur: boolean;
}

/* ------------------------------------------------------------------ */
/* Persistence payload (table strict)                                  */
/* ------------------------------------------------------------------ */

export interface SocietePersistencePayload {

	clt_id: string;

	soc_nom: string;
	soc_code: string;
	soc_adresse: string;
	soc_ville: string;
	soc_pays: string;
	soc_code_postal: string;
	soc_telephone: string;

	soc_siren: string;

	soc_client: boolean;
	soc_fournisseur: boolean;
}
