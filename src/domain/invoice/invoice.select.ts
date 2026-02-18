

// src/domain/invoice/invoice.select.ts

export const INVOICE_SALES_VIEW_FIELDS = [
  "inv_id",
  "clt_id",
  "soc_id",
  "exer_id",
  "cc_id",
  "oper_id",

  "inv_type",
  "inv_invoice_date",
  "inv_due_date",
  "inv_payment_date",
  "inv_bank_value_date",

  "inv_reference",
  "inv_designation",

  "inv_amount_ht",
  "inv_amount_tax",
  "inv_amount_ttc",

  "opb_operation_id",
  "inv_comments",
  "inv_lmod",

  // libellés
  "clt_nom",
  "soc_nom",
  "exer_code",
  "cc_code",
  "cc_libelle",
  "oper_nom",
  "oper_prenom",

  // extension sales
  "invs_deal_number",
  "invs_deal_name",
  "invs_revenue_type",
  "invs_payment_delay_days",
] as const;

export const SELECT_INVOICE_SALES_VIEW = INVOICE_SALES_VIEW_FIELDS.join(", ");

export const INVOICE_PURCHASE_VIEW_FIELDS = [
  "inv_id",
  "clt_id",
  "soc_id",
  "exer_id",
  "cc_id",
  "oper_id",

  "inv_type",
  "inv_invoice_date",
  "inv_due_date",
  "inv_payment_date",
  "inv_bank_value_date",

  "inv_reference",
  "inv_designation",

  "inv_amount_ht",
  "inv_amount_tax",
  "inv_amount_ttc",

  "opb_operation_id",
  "inv_comments",
  "inv_lmod",

  // libellés
  "clt_nom",
  "soc_nom",
  "exer_code",
  "cc_code",
  "cc_libelle",
  "oper_nom",
  "oper_prenom",

  // extension purchase
  "invp_paid_by_clt_amount",
  "invp_paid_by_third_party_amount",
] as const;

export const SELECT_INVOICE_PURCHASE_VIEW = INVOICE_PURCHASE_VIEW_FIELDS.join(", ");