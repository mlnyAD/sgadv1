

// src/domain/societe/societe.select.ts

export const SOCIETE_VIEW_FIELDS = [
	"soc_id",
	"clt_id",
	"soc_nom",
	"soc_code",
	"soc_adresse",
	"soc_code_postal",
	"soc_ville",
	"soc_pays",
	"soc_telephone",
	"soc_siren",
	"soc_client",
	"soc_fournisseur",
	"clt_nom",
	"lmod",
] as const;

export const SELECT_SOCIETE_VIEW = SOCIETE_VIEW_FIELDS.join(", ");
