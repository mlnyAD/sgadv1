
// src/domain/exercice/exercice.select.ts

export const EXERCICE_VIEW_FIELDS = [
	"exer_id",
	"clt_id",
	"exer_code",
	"exer_debut",
	"exer_fin",
	"exer_actif",
	"exer_commentaires",
	"clt_nom",	
	"lmod",
] as const;

export const SELECT_EXERCICE_VIEW = EXERCICE_VIEW_FIELDS.join(", ");

