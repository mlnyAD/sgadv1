

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCurrentClient } from "@/domain/session/current-client";

import type { InvoiceListItem } from "@/ui/invoice/invoice.types";

import type {
	InvoiceSalesRow,
	InvoicePurchaseRow,
	InvoiceInsert,
	InvoiceUpdate,
	InvoiceSalesInsert,
	InvoiceSalesUpdate,
	InvoicePurchaseInsert,
	InvoicePurchaseUpdate,
} from "@/domain/_db/rows";

import {
	SELECT_INVOICE_SALES_VIEW,
	SELECT_INVOICE_PURCHASE_VIEW,
} from "./invoice.select";

import {
	mapInvoiceSalesRowToView,
	mapInvoicePurchaseRowToView,
} from "./invoice-mapper";

import type {
	InvoiceSalesView,
	InvoicePurchaseView,
} from "./invoice-types";

/* ================================================================== */
/* READ                                                                */
/* ================================================================== */

export async function getInvoiceSalesById(params: {
	cltId: string;
	invoiceId: string;
}): Promise<InvoiceSalesView | null> {
	const supabase = await createSupabaseServerReadClient();

	const { data, error } = await supabase
		.from("vw_invoice_sales_view")
		.select(SELECT_INVOICE_SALES_VIEW)
		.eq("inv_id", params.invoiceId)
		.eq("clt_id", params.cltId)
		.maybeSingle();

	if (error || !data) return null;

	return mapInvoiceSalesRowToView(data as unknown as InvoiceSalesRow);
}

export async function getInvoicePurchaseById(params: {
	cltId: string;
	invoiceId: string;
}): Promise<InvoicePurchaseView | null> {
	const supabase = await createSupabaseServerReadClient();

	const { data, error } = await supabase
		.from("vw_invoice_purchase_view")
		.select(SELECT_INVOICE_PURCHASE_VIEW)
		.eq("inv_id", params.invoiceId)
		.eq("clt_id", params.cltId)
		.maybeSingle();

	if (error || !data) return null;

	return mapInvoicePurchaseRowToView(data as unknown as InvoicePurchaseRow);
}

export async function listInvoiceSales(params: {
	cltId: string;
	page: number;
	pageSize: number;
	search?: string;
}): Promise<{ data: InvoiceSalesView[]; total: number }> {
	const { cltId, page, pageSize, search } = params;

	const supabase = await createSupabaseServerReadClient();

	let query = supabase
		.from("vw_invoice_sales_view")
		.select(SELECT_INVOICE_SALES_VIEW, { count: "exact" })
		.eq("clt_id", cltId)
		.order("inv_invoice_date", { ascending: false });

	if (search) {
		query = query.or(
			`inv_reference.ilike.%${search}%,inv_designation.ilike.%${search}%`
		);
	}

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await query.range(from, to);
	if (error) throw new Error(error.message);

	const rows = (data ?? []) as unknown as InvoiceSalesRow[];

	return {
		data: rows.map(mapInvoiceSalesRowToView),
		total: count ?? 0,
	};
}

export async function listInvoicePurchase(params: {
	cltId: string;
	page: number;
	pageSize: number;
	search?: string;
}): Promise<{ data: InvoicePurchaseView[]; total: number }> {
	const { cltId, page, pageSize, search } = params;

	const supabase = await createSupabaseServerReadClient();

	let query = supabase
		.from("vw_invoice_purchase_view")
		.select(SELECT_INVOICE_PURCHASE_VIEW, { count: "exact" })
		.eq("clt_id", cltId)
		.order("inv_invoice_date", { ascending: false });

	if (search) {
		query = query.or(
			`inv_reference.ilike.%${search}%,inv_designation.ilike.%${search}%`
		);
	}

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await query.range(from, to);
	if (error) throw new Error(error.message);

	const rows = (data ?? []) as unknown as InvoicePurchaseRow[];

	return {
		data: rows.map(mapInvoicePurchaseRowToView),
		total: count ?? 0,
	};
}

/* ================================================================== */
/* WRITE                                                               */
/* ================================================================== */

export async function createInvoiceSales(payload: {
	invoice: Omit<InvoiceInsert, "clt_id">;
	sales: Omit<InvoiceSalesInsert, "inv_id">;
}): Promise<{ invId: string }> {

	const { current } = await getCurrentClient();
	if (!current?.cltId) throw new Error("Aucun client sélectionné");
	const cltId = current.cltId;
	if (!cltId) throw new Error("Aucun client sélectionné (clt_id manquant)");
	const invoiceToInsert = { ...payload.invoice, clt_id: cltId };

	const supabase = await createSupabaseAdminClient();

	// 1) invoice
	const { data: created, error: e1 } = await supabase
		.from("invoice")
		.insert(invoiceToInsert)
		.select("inv_id")
		.maybeSingle();

	if (e1 || !created?.inv_id) {
		throw new Error(e1?.message ?? "Création invoice impossible");
	}

	// 2) extension sales
	const { error: e2 } = await supabase
		.from("invoice_sales")
		.insert({ inv_id: created.inv_id, ...payload.sales });

	console.log("createInvoiceSales e2", e2)
	if (e2) throw new Error(e2.message);

	return { invId: created.inv_id };
}

export async function createInvoicePurchase(payload: {
	invoice: Omit<InvoiceInsert, "clt_id">;
	purchase: Omit<InvoicePurchaseInsert, "inv_id">;
}): Promise<{ invId: string }> {
	const { current } = await getCurrentClient();
	if (!current?.cltId) throw new Error("Aucun client sélectionné");

	const supabase = await createSupabaseAdminClient();

	const { data: created, error: e1 } = await supabase
		.from("invoice")
		.insert({ ...payload.invoice, clt_id: current.cltId, inv_type: 2 })
		.select("inv_id")
		.maybeSingle();

	if (e1 || !created?.inv_id) {
		throw new Error(e1?.message ?? "Création invoice impossible");
	}

	const { error: e2 } = await supabase
		.from("invoice_purchase")
		.insert({ inv_id: created.inv_id, ...payload.purchase });

	if (e2) throw new Error(e2.message);

	return { invId: created.inv_id };
}

export async function updateInvoiceSales(invId: string, payload: {
	invoice: InvoiceUpdate;
	sales: InvoiceSalesUpdate;
}): Promise<void> {
	const { current } = await getCurrentClient();
	if (!current?.cltId) throw new Error("Aucun client sélectionné");

	const supabase = await createSupabaseAdminClient();

	const { error: e1 } = await supabase
		.from("invoice")
		.update(payload.invoice)
		.eq("inv_id", invId)
		.eq("clt_id", current.cltId);

	if (e1) throw new Error(e1.message);

	const { error: e2 } = await supabase
		.from("invoice_sales")
		.update(payload.sales)
		.eq("inv_id", invId);

	if (e2) throw new Error(e2.message);
}

export async function updateInvoicePurchase(invId: string, payload: {
	invoice: InvoiceUpdate;
	purchase: InvoicePurchaseUpdate;
}): Promise<void> {
	const { current } = await getCurrentClient();
	if (!current?.cltId) throw new Error("Aucun client sélectionné");

	const supabase = await createSupabaseAdminClient();

	const { error: e1 } = await supabase
		.from("invoice")
		.update(payload.invoice)
		.eq("inv_id", invId)
		.eq("clt_id", current.cltId);

	if (e1) throw new Error(e1.message);

	const { error: e2 } = await supabase
		.from("invoice_purchase")
		.update(payload.purchase)
		.eq("inv_id", invId);

	if (e2) throw new Error(e2.message);
}

export async function listInvoices(params: {
	cltId: string;
	invType: 1 | 2;
	page: number;
	pageSize: number;
	search?: string;
	exerId?: string;
	socId?: string;
	ccId?: string;
}): Promise<{ data: InvoiceListItem[]; total: number }> {
	const { cltId, invType, page, pageSize, search, exerId, socId, ccId } = params;

	const supabase = await createSupabaseServerReadClient();

	const viewName =
		invType === 1 ? "vw_invoice_sales_view" : "vw_invoice_purchase_view";

	let query = supabase
		.from(viewName)
		.select(
			[
				"inv_id",
				"exer_code",
				"soc_nom",
				"inv_invoice_date",
				"inv_designation",
				"inv_amount_ht",
				"inv_amount_tax",
				"inv_amount_ttc",
				"inv_payment_date",
				"inv_bank_value_date",
				"inv_reference",
				"cc_code",
			].join(", "),
			{ count: "exact" }
		)
		.eq("clt_id", cltId)
		.order("inv_invoice_date", { ascending: false });

	if (search) {
		// minimal: match designation ou reference
		query = query.or(`inv_designation.ilike.%${search}%,inv_reference.ilike.%${search}%`);
	}
	if (exerId) query = query.eq("exer_id", exerId);
	if (socId) query = query.eq("soc_id", socId);
	if (ccId) query = query.eq("cc_id", ccId);

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await query.range(from, to);
	if (error) throw new Error(error.message);

	type InvoiceListRow = {
  inv_id: string;
  exer_code: string | null;
  soc_nom: string | null;
  inv_invoice_date: string; // ou Date selon ton mapping
  inv_designation: string | null;
  inv_amount_ht: number | null;
  inv_amount_tax: number | null;
  inv_amount_ttc: number | null;
  inv_payment_date: string | null;
  inv_bank_value_date: string | null;
  inv_reference: string | null;
  cc_code: string | null;
};

const rows = (data ?? []) as unknown as InvoiceListRow[];

	return {
		data: rows.map(
			(r): InvoiceListItem => ({
				id: r.inv_id,
				exerciceCode: r.exer_code ?? null,
				societeNom: r.soc_nom ?? null,
				dateFacture: r.inv_invoice_date,
				designation: r.inv_designation ?? "",
				montantHt: r.inv_amount_ht ?? 0,
				montantTax: r.inv_amount_tax ?? 0,
				montantTtc: r.inv_amount_ttc ?? 0,
				datePaiement: r.inv_payment_date ?? null,
				dateValeur: r.inv_bank_value_date ?? null,
				reference: r.inv_reference ?? null,
				centreCoutCode: r.cc_code ?? null,
			})
		),
		total: count ?? 0,
	};
}

export async function deleteInvoiceSales(params: { invId: string }): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = createSupabaseAdminClient();

  const { error: e1 } = await supabase.from("invoice_sales").delete().eq("inv_id", params.invId);
  if (e1) throw new Error(e1.message);

  const { error: e2 } = await supabase
    .from("invoice")
    .delete()
    .eq("inv_id", params.invId)
    .eq("clt_id", current.cltId);

  if (e2) throw new Error(e2.message);
}


export async function deleteInvoicePurchase(params: { invId: string }): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = createSupabaseAdminClient();

  const { error: e1 } = await supabase.from("invoice_purchase").delete().eq("inv_id", params.invId);
  if (e1) throw new Error(e1.message);

  const { error: e2 } = await supabase
    .from("invoice")
    .delete()
    .eq("inv_id", params.invId)
    .eq("clt_id", current.cltId);

  if (e2) throw new Error(e2.message);
}