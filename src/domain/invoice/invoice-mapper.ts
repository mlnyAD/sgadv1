

import type { InvoiceInsert, InvoiceUpdate, InvoiceSalesInsert, InvoiceSalesUpdate, InvoicePurchaseInsert, InvoicePurchaseUpdate, InvoicePurchaseRow, InvoiceSalesRow } from "@/domain/_db/rows";

import type { InvoiceSalesFormValues } from "@/ui/invoice/edit/invoice-sales-form.types";
import type { InvoicePurchaseFormValues } from "@/ui/invoice/edit/invoice-purchase-form.types";
import { reqStr } from "@/helpers/row-guards";
import { InvoicePurchaseView, InvoiceSalesView } from "./invoice-types";
import { toInvoiceTypeId } from "./invoice-types.catalog";

/* ================================================================== */
/* SALES                                                               */
/* ================================================================== */

export function mapInvoiceSalesFormToInvoiceInsert(
  form: InvoiceSalesFormValues
): Omit<InvoiceInsert, "clt_id" | "oper_id"> {
  return {
    soc_id: form.socId,
    exer_id: form.exerId,
    cc_id: form.ccId,

    inv_type: form.invType,

    inv_invoice_date: form.invoiceDate,
    inv_due_date: form.dueDate,
    inv_payment_date: form.paymentDate,
    inv_bank_value_date: form.bankValueDate,

    inv_reference: form.reference,
    inv_designation: form.designation,

    inv_amount_ht: form.amountHt,
    inv_amount_tax: form.amountTax,
    inv_amount_ttc: form.amountTtc,

    inv_comments: form.comments,
    opb_operation_id: form.opbOperationId,
  };
}

export function mapInvoiceSalesFormToInvoiceUpdate(
  form: InvoiceSalesFormValues
): InvoiceUpdate {
  return {
    soc_id: form.socId,
    exer_id: form.exerId,
    cc_id: form.ccId,

    inv_type: form.invType,

    inv_invoice_date: form.invoiceDate,
    inv_due_date: form.dueDate,
    inv_payment_date: form.paymentDate,
    inv_bank_value_date: form.bankValueDate,

    inv_reference: form.reference,
    inv_designation: form.designation,

    inv_amount_ht: form.amountHt,
    inv_amount_tax: form.amountTax,
    inv_amount_ttc: form.amountTtc,

    inv_comments: form.comments,
    opb_operation_id: form.opbOperationId,
  };
}

export function mapInvoiceSalesFormToSalesInsert(
  form: InvoiceSalesFormValues
): Omit<InvoiceSalesInsert, "inv_id"> {
  return {
    invs_deal_number: form.dealNumber,
    invs_deal_name: form.dealName,
    invs_revenue_type: form.revenueTypeId,
    invs_payment_delay_days: form.paymentDelayDays,
  };
}

export function mapInvoiceSalesFormToSalesUpdate(
  form: InvoiceSalesFormValues
): InvoiceSalesUpdate {
  return {
    invs_deal_number: form.dealNumber,
    invs_deal_name: form.dealName,
    invs_revenue_type: form.revenueTypeId,
    invs_payment_delay_days: form.paymentDelayDays,
  };
}

/* ================================================================== */
/* PURCHASE                                                            */
/* ================================================================== */

export function mapInvoicePurchaseFormToInvoiceInsert(
  form: InvoicePurchaseFormValues
): Omit<InvoiceInsert, "clt_id" | "oper_id"> {
  return {
    soc_id: form.socId,
    exer_id: form.exerId,
    cc_id: form.ccId,

    inv_type: form.invType,

    inv_invoice_date: form.invoiceDate,
    inv_due_date: form.dueDate,
    inv_payment_date: form.paymentDate,
    inv_bank_value_date: form.bankValueDate,

    inv_reference: form.reference,
    inv_designation: form.designation,

    inv_amount_ht: form.amountHt,
    inv_amount_tax: form.amountTax,
    inv_amount_ttc: form.amountTtc,

    inv_comments: form.comments,
    opb_operation_id: form.opbOperationId,
  };
}

export function mapInvoicePurchaseFormToInvoiceUpdate(
  form: InvoicePurchaseFormValues
): InvoiceUpdate {
  return {
    soc_id: form.socId,
    exer_id: form.exerId,
    cc_id: form.ccId,

    inv_type: form.invType,

    inv_invoice_date: form.invoiceDate,
    inv_due_date: form.dueDate,
    inv_payment_date: form.paymentDate,
    inv_bank_value_date: form.bankValueDate,

    inv_reference: form.reference,
    inv_designation: form.designation,

    inv_amount_ht: form.amountHt,
    inv_amount_tax: form.amountTax,
    inv_amount_ttc: form.amountTtc,

    inv_comments: form.comments,
    opb_operation_id: form.opbOperationId,
  };
}

export function mapInvoicePurchaseFormToPurchaseInsert(
  form: InvoicePurchaseFormValues
): Omit<InvoicePurchaseInsert, "inv_id"> {
  return {
    invp_paid_by_clt_amount: form.paidByCltAmount,
    invp_paid_by_third_party_amount: form.paidByThirdPartyAmount,
  };
}

export function mapInvoicePurchaseFormToPurchaseUpdate(
  form: InvoicePurchaseFormValues
): InvoicePurchaseUpdate {
  return {
    invp_paid_by_clt_amount: form.paidByCltAmount,
    invp_paid_by_third_party_amount: form.paidByThirdPartyAmount,
  };
}

/* ================================================================== */
/* ROW -> VIEW (READ)                                                  */
/* ================================================================== */

export function mapInvoiceSalesRowToView(row: InvoiceSalesRow): InvoiceSalesView {
  return {
    id: reqStr(row.inv_id, "inv_id", "vw_invoice_sales_view"),

    clientId: reqStr(row.clt_id, "clt_id", "vw_invoice_sales_view"),
    clientNom: row.clt_nom ?? null,

    societeId: reqStr(row.soc_id, "soc_id", "vw_invoice_sales_view"),
    societeNom: row.soc_nom ?? null,

    exerciceId: reqStr(row.exer_id, "exer_id", "vw_invoice_sales_view"),
    exerciceCode: row.exer_code ?? null,

    centreCoutId: reqStr(row.cc_id, "cc_id", "vw_invoice_sales_view"),
    centreCoutCode: row.cc_code ?? null,
    centreCoutLibelle: row.cc_libelle ?? null,

    operateurId: reqStr(row.oper_id, "oper_id", "vw_invoice_sales_view"),
    operateurNom: row.oper_nom ?? null,
    operateurPrenom: row.oper_prenom ?? null,

    typeId: toInvoiceTypeId(row.inv_type ?? 0),

    dateFacture: reqStr(row.inv_invoice_date, "inv_invoice_date", "vw_invoice_sales_view"),
    dateEcheance: row.inv_due_date ?? null,
    datePaiement: row.inv_payment_date ?? null,
    dateValeur: row.inv_bank_value_date ?? null,

    reference: row.inv_reference ?? null,
    designation: row.inv_designation ?? "",

    montantHt: row.inv_amount_ht ?? 0,
    montantTax: row.inv_amount_tax ?? 0,
    montantTtc: row.inv_amount_ttc ?? 0,

    opbOperationId: row.opb_operation_id ?? null,

    commentaires: row.inv_comments ?? null,
    lmod: row.inv_lmod ?? "",

    // extension sales
    dealNumber: row.invs_deal_number ?? null,
    dealName: row.invs_deal_name ?? null,
    revenueTypeId: row.invs_revenue_type ?? null,
    paymentDelayDays: row.invs_payment_delay_days ?? null,
  };
}

export function mapInvoicePurchaseRowToView(row: InvoicePurchaseRow): InvoicePurchaseView {
  return {
    id: reqStr(row.inv_id, "inv_id", "vw_invoice_purchase_view"),

    clientId: reqStr(row.clt_id, "clt_id", "vw_invoice_purchase_view"),
    clientNom: row.clt_nom ?? null,

    societeId: reqStr(row.soc_id, "soc_id", "vw_invoice_purchase_view"),
    societeNom: row.soc_nom ?? null,

    exerciceId: reqStr(row.exer_id, "exer_id", "vw_invoice_purchase_view"),
    exerciceCode: row.exer_code ?? null,

    centreCoutId: reqStr(row.cc_id, "cc_id", "vw_invoice_purchase_view"),
    centreCoutCode: row.cc_code ?? null,
    centreCoutLibelle: row.cc_libelle ?? null,

    operateurId: reqStr(row.oper_id, "oper_id", "vw_invoice_purchase_view"),
    operateurNom: row.oper_nom ?? null,
    operateurPrenom: row.oper_prenom ?? null,

    typeId: toInvoiceTypeId(row.inv_type ?? 0),

    dateFacture: reqStr(row.inv_invoice_date, "inv_invoice_date", "vw_invoice_purchase_view"),
    dateEcheance: row.inv_due_date ?? null,
    datePaiement: row.inv_payment_date ?? null,
    dateValeur: row.inv_bank_value_date ?? null,

    reference: row.inv_reference ?? null,
    designation: row.inv_designation ?? "",

    montantHt: row.inv_amount_ht ?? 0,
    montantTax: row.inv_amount_tax ?? 0,
    montantTtc: row.inv_amount_ttc ?? 0,

    opbOperationId: row.opb_operation_id ?? null,

    commentaires: row.inv_comments ?? null,
    lmod: row.inv_lmod ?? "",

    // extension purchase
    paidByCltAmount: row.invp_paid_by_clt_amount ?? 0,
    paidByThirdPartyAmount: row.invp_paid_by_third_party_amount ?? 0,
  };
}