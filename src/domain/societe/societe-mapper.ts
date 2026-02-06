

// src/domain/centre-cout/centre-cout-mapper.ts

import type {
	SocieteDbRow,
	SocieteView,
	SocieteFormValues,
	SocietePersistencePayload,
} from "./societe-types";


/* ------------------------------------------------------------------
   UI (form) -> DB (CREATE / UPDATE)
   ------------------------------------------------------------------ */

export function mapSocieteFormToDb(
	ui: SocieteFormValues
): SocietePersistencePayload {
	return {
		clt_id: ui.cltId,

		soc_nom: ui.nom,
		soc_code: ui.code,
		soc_adresse: ui.adresse,
		soc_ville: ui.ville,
		soc_pays: ui.pays,
		soc_code_postal: ui.codePostal,
		soc_telephone: ui.telephone,

		soc_siren: ui.siren,

		soc_client: ui.client,
		soc_fournisseur: ui.fournisseur,
	};
}

/* ------------------------------------------------------------------
   DB -> VIEW (lecture)
   ------------------------------------------------------------------ */

export function mapSocieteDbToView(
	row: SocieteDbRow
): SocieteView {

	//console.log("mapSocieteDbToView " ,row )

	return {
		id: row.soc_id,

		cltId: row.clt_id,

		nom: row.soc_nom,
		code: row.soc_code,

		adresse: row.soc_adresse,
		ville: row.soc_ville,
		pays: row.soc_pays,
		codePostal: row.soc_code_postal,
		telephone: row.soc_telephone,

		siren: row.soc_siren,

		client: row.soc_client,
		fournisseur: row.soc_fournisseur,

	};
}


/* ------------------------------------------------------------------ */
/* Form → View                                                         */
/* ------------------------------------------------------------------ */
export function mapFormToSocieteView(
  form: SocieteFormValues,
  societeId?: string
): SocieteView {
  return {
	id: societeId ?? "",
	cltId: form.cltId,
	nom: form.nom,
	code: form.code,
	adresse: form.adresse,
	ville: form.ville,
	codePostal: form.codePostal,
	pays: form.pays,
	telephone: form.telephone,
	siren: form.siren,
	client: form.client,
	fournisseur: form.fournisseur,
  };
}