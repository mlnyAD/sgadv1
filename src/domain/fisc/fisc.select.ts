

// src/domain/fisc/fisc.select.ts

export const FISC_VIEW_FIELDS = [
  "fisc_id",
  "fisc_clt_id",
  "fisc_soc_id",
  "fisc_exer_id",
  "fisc_type_id",
  "fisc_montant",
  "fisc_date",
  "fisc_comments",
  "fisc_lmod",
  "clt_nom",
  "exer_code",
  "soc_nom",
] as const;

export const SELECT_FISC_VIEW = FISC_VIEW_FIELDS.join(", ");