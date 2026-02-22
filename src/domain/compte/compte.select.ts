

// src/domain/compte/compte.select.ts

export const COMPTE_VIEW_FIELDS = [
  "tro_cpt_id",
  "tro_clt_id",
  "tro_soc_id",
  "tro_cpt_nom",
  "tro_cpt_ordre",
  "tro_cpt_actif",
  "tro_cpt_inclus_global",
  "tro_lmod",
] as const;

export const SELECT_COMPTE_VIEW = COMPTE_VIEW_FIELDS.join(", ");