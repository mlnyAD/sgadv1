

// src/domain/budget/budget.select.ts
export const BUDGET_VIEW_FIELDS = [
  "bud_id",
  "clt_id",
  "clt_nom",
  "exer_id",
  "exer_code",
  "bud_kind",
  "revenue_type_id",
  "cc_id",
  "cc_code",
  "cc_libelle",
  "famille_id",
  "bud_amount_ht_eur",
  "oper_id",
  "oper_nom",
  "oper_prenom",
  "created_at",
  "updated_at",
] as const;

export const SELECT_BUDGET_VIEW = BUDGET_VIEW_FIELDS.join(", ");