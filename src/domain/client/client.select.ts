

// src/domain/client/client.select.ts

export const CLIENT_VIEW_FIELDS = [
	"clt_id",
	"clt_code",
	"clt_nom",
	"clt_adresse",
	"clt_code_postal",
	"clt_ville",
	"clt_pays",
	"clt_email",
	"clt_telephone",
	"clt_actif",
	"lmod",
] as const;

export const SELECT_CLIENT_VIEW = CLIENT_VIEW_FIELDS.join(", ");