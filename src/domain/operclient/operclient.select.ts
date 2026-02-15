


// src/domain/operclient/operclient.select.ts

export const OPERCLIENT_VIEW_FIELDS = [
  "opcl_id",
  "oper_id",
  "oper_nom",
  "oper_email",
  "oper_actif",
  "clt_id",
  "clt_nom",
  "clt_actif",
  "lmod",
] as const;

export const SELECT_OPERCLIENT_VIEW = OPERCLIENT_VIEW_FIELDS.join(", ");