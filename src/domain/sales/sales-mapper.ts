

import type { SalesInsert, SalesUpdate, SalesRow } from "@/domain/_db/rows";
import type { SalesFormValues } from "@/ui/sales/edit/sales-form.types";
import { reqStr } from "@/helpers/row-guards";
import type { SalesView } from "./sales-types";

export const DEFAULT_PAYMENT_DELAY_DAYS = 60;

export function mapSalesFormToSalesInsert(
  form: SalesFormValues
): Omit<SalesInsert, "clt_id" | "oper_id"> {
  return {
    soc_id: form.socId,
    exer_id: form.exerId,

    sal_invoice_date: form.invoiceDate,
    sal_due_date: form.dueDate,
    sal_payment_date: form.paymentDate,
    sal_bank_value_date: form.bankValueDate,

    sal_reference: form.reference,
    sal_designation: form.designation,

    sal_amount_ht: form.amountHt,
    sal_amount_tax: form.amountTax,
    sal_amount_ttc: form.amountTtc,

    sal_comments: form.comments,
    opb_operation_id: form.opbOperationId,

    sal_deal_number: form.dealNumber,
    sal_deal_name: form.dealName,
    sal_revenue_type_id: form.revenueTypeId,
    sal_payment_delay_days: form.paymentDelayDays,
  };
}

export function mapSalesFormToSalesUpdate(
  form: SalesFormValues
): SalesUpdate {
  return {
    soc_id: form.socId,
    exer_id: form.exerId,

    sal_invoice_date: form.invoiceDate,
    sal_due_date: form.dueDate,
    sal_payment_date: form.paymentDate,
    sal_bank_value_date: form.bankValueDate,

    sal_reference: form.reference,
    sal_designation: form.designation,

    sal_amount_ht: form.amountHt,
    sal_amount_tax: form.amountTax,
    sal_amount_ttc: form.amountTtc,

    sal_comments: form.comments,
    opb_operation_id: form.opbOperationId,

    sal_deal_number: form.dealNumber,
    sal_deal_name: form.dealName,
    sal_revenue_type_id: form.revenueTypeId,
    sal_payment_delay_days: form.paymentDelayDays,
  };
}

export function mapSalesRowToView(row: SalesRow): SalesView {
  return {
    id: reqStr(row.sal_id, "sal_id", "vw_sales_view"),

    clientId: reqStr(row.clt_id, "clt_id", "vw_sales_view"),
    clientNom: row.clt_nom ?? null,

    societeId: reqStr(row.soc_id, "soc_id", "vw_sales_view"),
    societeNom: row.soc_nom ?? null,

    exerciceId: reqStr(row.exer_id, "exer_id", "vw_sales_view"),
    exerciceCode: row.exer_code ?? null,

    operateurId: row.oper_id ?? null,
    operateurNom: row.oper_nom ?? null,
    operateurPrenom: row.oper_prenom ?? null,

    dateFacture: reqStr(row.sal_invoice_date, "sal_invoice_date", "vw_sales_view"),
    dateEcheance: row.sal_due_date ?? null,
    datePaiement: row.sal_payment_date ?? null,
    dateValeur: row.sal_bank_value_date ?? null,

    reference: row.sal_reference ?? null,
    designation: row.sal_designation ?? "",

    montantHt: row.sal_amount_ht ?? 0,
    montantTax: row.sal_amount_tax ?? 0,
    montantTtc: row.sal_amount_ttc ?? 0,

    opbOperationId: row.opb_operation_id ?? null,
    commentaires: row.sal_comments ?? null,
    lmod: row.sal_lmod ?? "",

    dealNumber: row.sal_deal_number ?? null,
    dealName: row.sal_deal_name ?? null,
    revenueTypeId: row.sal_revenue_type_id ?? null,
    paymentDelayDays: row.sal_payment_delay_days ?? DEFAULT_PAYMENT_DELAY_DAYS
  };
}