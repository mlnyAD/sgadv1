

// src/domain/purchase /purchase.select.ts

export const PURCHASE_VIEW_FIELDS = [
  "pur_id",
  "clt_id",
  "soc_id",
  "exer_id",
  "cc_id",
  "oper_id",

  "pur_invoice_date",
  "pur_due_date",
  "pur_payment_date",
  "pur_bank_value_date",

  "pur_reference",
  "pur_designation",

  "pur_amount_ht",
  "pur_amount_tax",
  "pur_amount_ttc",

  "opb_operation_id",
  "pur_comments",
  "pur_lmod",

  // libellés
  "clt_nom",
  "soc_nom",
  "exer_code",
  "cc_code",
  "cc_libelle",
  "oper_nom",
  "oper_prenom",

  "pur_paid_by_clt_amount",
  "pur_paid_by_third_party_amount",
] as const;

export const SELECT_PURCHASE_VIEW = PURCHASE_VIEW_FIELDS.join(", ");