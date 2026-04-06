

// src/domain/sales/sales.select.ts

export const SALES_VIEW_FIELDS = [
  "sal_id",
  "clt_id",
  "soc_id",
  "exer_id",
  "oper_id",

  "sal_invoice_date",
  "sal_due_date",
  "sal_payment_date",
  "sal_bank_value_date",

  "sal_reference",
  "sal_designation",

  "sal_amount_ht",
  "sal_amount_tax",
  "sal_amount_ttc",

  "opb_operation_id",
  "sal_comments",
  "sal_lmod",

  // libellés
  "clt_nom",
  "soc_nom",
  "exer_code",
  "oper_nom",
  "oper_prenom",

  // extension sales
  "sal_deal_number",
  "sal_deal_name",
  "sal_revenue_type_id",
  "sal_payment_delay_days",
] as const;

export const SELECT_SALES_VIEW = SALES_VIEW_FIELDS.join(", ");
