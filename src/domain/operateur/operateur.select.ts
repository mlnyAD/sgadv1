

// src/domain/operateur/operateur.select.ts

export const OPERATEUR_VIEW_FIELDS = [
  "oper_id",
  "oper_nom",
  "oper_prenom",
  "oper_email",
  "oper_admin_sys",
  "oper_actif",
  "must_change_pwd",
] as const;

export const SELECT_OPERATEUR_VIEW = OPERATEUR_VIEW_FIELDS.join(", ");

