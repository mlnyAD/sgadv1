

import type { PurchaseInsert, PurchaseUpdate, PurchaseRow } from "@/domain/_db/rows";
import type { PurchaseFormValues } from "@/ui/purchase/edit/purchase-form.types";
import { reqStr } from "@/helpers/row-guards";
import type { PurchaseView } from "./purchase-types";

export function mapPurchaseFormToPurchaseInsert(
  form: PurchaseFormValues
): Omit<PurchaseInsert, "clt_id" | "oper_id"> {
  return {
    soc_id: form.socId,
    exer_id: form.exerId,
    cc_id: form.ccId,

    pur_invoice_date: form.invoiceDate,
    pur_due_date: form.dueDate,
    pur_payment_date: form.paymentDate,
    pur_bank_value_date: form.bankValueDate,

    pur_reference: form.reference,
    pur_designation: form.designation,

    pur_amount_ht: form.amountHt,
    pur_amount_tax: form.amountTax,
    pur_amount_ttc: form.amountTtc,

    pur_comments: form.comments,
    opb_operation_id: form.opbOperationId,

    pur_paid_by_clt_amount: form.paidByCltAmount,
    pur_paid_by_third_party_amount: form.paidByThirdPartyAmount,
  };
}

export function mapPurchaseFormToPurchaseUpdate(
  form: PurchaseFormValues
): PurchaseUpdate {
  return {
    soc_id: form.socId,
    exer_id: form.exerId,
    cc_id: form.ccId,

    pur_invoice_date: form.invoiceDate,
    pur_due_date: form.dueDate,
    pur_payment_date: form.paymentDate,
    pur_bank_value_date: form.bankValueDate,

    pur_reference: form.reference,
    pur_designation: form.designation,

    pur_amount_ht: form.amountHt,
    pur_amount_tax: form.amountTax,
    pur_amount_ttc: form.amountTtc,

    pur_comments: form.comments,
    opb_operation_id: form.opbOperationId,

    pur_paid_by_clt_amount: form.paidByCltAmount,
    pur_paid_by_third_party_amount: form.paidByThirdPartyAmount,
  };
}

export function mapPurchaseRowToView(row: PurchaseRow): PurchaseView {
  return {
    id: reqStr(row.pur_id, "pur_id", "vw_purchase_view"),

    clientId: reqStr(row.clt_id, "clt_id", "vw_purchase_view"),
    clientNom: row.clt_nom ?? null,

    societeId: reqStr(row.soc_id, "soc_id", "vw_purchase_view"),
    societeNom: row.soc_nom ?? null,

    exerciceId: reqStr(row.exer_id, "exer_id", "vw_purchase_view"),
    exerciceCode: row.exer_code ?? null,

    centreCoutId: reqStr(row.cc_id, "cc_id", "vw_purchase_view"),
    centreCoutCode: row.cc_code ?? null,
    centreCoutLibelle: row.cc_libelle ?? null,

    operateurId: row.oper_id ?? null,
    operateurNom: row.oper_nom ?? null,
    operateurPrenom: row.oper_prenom ?? null,

    dateFacture: reqStr(row.pur_invoice_date, "pur_invoice_date", "vw_purchase_view"),
    dateEcheance: row.pur_due_date ?? null,
    datePaiement: row.pur_payment_date ?? null,
    dateValeur: row.pur_bank_value_date ?? null,

    reference: row.pur_reference ?? null,
    designation: row.pur_designation ?? "",

    montantHt: row.pur_amount_ht ?? 0,
    montantTax: row.pur_amount_tax ?? 0,
    montantTtc: row.pur_amount_ttc ?? 0,

    opbOperationId: row.opb_operation_id ?? null,
    commentaires: row.pur_comments ?? null,
    lmod: row.pur_lmod ?? "",

    paidByCltAmount: row.pur_paid_by_clt_amount ?? 0,
    paidByThirdPartyAmount: row.pur_paid_by_third_party_amount ?? 0,
  };
}