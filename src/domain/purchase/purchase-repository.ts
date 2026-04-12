

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerWriteClient } from "@/lib/supabase/server-write";
import { getCurrentClient } from "@/domain/session/current-client";

import type { PurchaseListItem } from "@/ui/purchase/purchase.types";
import type {
  PurchaseRow,
  PurchaseInsert,
  PurchaseUpdate,
} from "@/domain/_db/rows";

import { SELECT_PURCHASE_VIEW } from "./purchase.select";
import { mapPurchaseRowToView } from "./purchase-mapper";
import type { PurchaseView } from "./purchase-types";


/* ================================================================== */
/* READ                                                                */
/* ================================================================== */

export async function listPurchases(params: {
	cltId: string;
	page: number;
	pageSize: number;
	search?: string;
	exerId?: string;
	socId?: string;
	ccId?: string;
}): Promise<{ data: PurchaseListItem[]; total: number }> {
	const { cltId, page, pageSize, search, exerId, socId, ccId } = params;

	const supabase = await createSupabaseServerReadClient();

	let query = supabase
		.from("vw_purchase_view")
		.select(
			[
				"pur_id",
				"exer_code",
				"soc_nom",
				"pur_invoice_date",
				"pur_designation",
				"pur_amount_ht",
				"pur_amount_tax",
				"pur_amount_ttc",
				"pur_payment_date",
				"pur_bank_value_date",
				"pur_reference",
				"cc_code",
			].join(", "),
			{ count: "exact" }
		)
		.eq("clt_id", cltId)
		.order("pur_invoice_date", { ascending: false });

	if (search) {
		// minimal: match designation ou reference
		query = query.or(`pur_designation.ilike.%${search}%,pur_reference.ilike.%${search}%`);
	}
	if (exerId) query = query.eq("exer_id", exerId);
	if (socId) query = query.eq("soc_id", socId);
	if (ccId) query = query.eq("cc_id", ccId);

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await query.range(from, to);
	if (error) throw new Error(error.message);

	type PurchaseListRow = {
		pur_id: string;
		exer_code: string | null;
		soc_nom: string | null;
		pur_invoice_date: string; // ou Date selon ton mapping
		pur_designation: string | null;
		pur_amount_ht: number | null;
		pur_amount_tax: number | null;
		pur_amount_ttc: number | null;
		pur_payment_date: string | null;
		pur_bank_value_date: string | null;
		pur_reference: string | null;
		cc_code: string | null;
	};

	const rows = (data ?? []) as unknown as PurchaseListRow[];

	return {
		data: rows.map(
			(r): PurchaseListItem => ({
				id: r.pur_id,
				exerciceCode: r.exer_code ?? null,
				societeNom: r.soc_nom ?? null,
				dateFacture: r.pur_invoice_date,
				designation: r.pur_designation ?? "",
				montantHt: r.pur_amount_ht ?? 0,
				montantTax: r.pur_amount_tax ?? 0,
				montantTtc: r.pur_amount_ttc ?? 0,
				datePaiement: r.pur_payment_date ?? null,
				dateValeur: r.pur_bank_value_date ?? null,
				reference: r.pur_reference ?? null,
				centreCoutCode: r.cc_code ?? null,
			})
		),
		total: count ?? 0,
	};
}

export async function getPurchaseById(params: {
  cltId: string;
  purId: string;
}): Promise<PurchaseView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_purchase_view")
    .select(SELECT_PURCHASE_VIEW)
    .eq("pur_id", params.purId)
    .eq("clt_id", params.cltId)
    .maybeSingle();

  if (error || !data) return null;

  return mapPurchaseRowToView(data as unknown as PurchaseRow);
}

/* ================================================================== */
/* Write                                                                */
/* ================================================================== */

export async function createPurchase(
  payload: Omit<PurchaseInsert, "clt_id" | "pur_id">
): Promise<{ purId: string }> {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/purchases",
  });

  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseServerWriteClient();

  //console.log("Create Purchase Payload = ", payload)

  const { data: created, error } = await supabase
    .from("purchase")
    .insert({
      ...payload,
      clt_id: current.cltId,
    })
    .select("pur_id")
    .maybeSingle();

  if (error || !created?.pur_id) {
    throw new Error(error?.message ?? "Création purchase impossible");
  }

  return { purId: created.pur_id };
}

export async function updatePurchase(
  purId: string,
  payload: PurchaseUpdate
): Promise<void> {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/purchases",
  });

  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseServerWriteClient();

  const { error } = await supabase
    .from("purchase")
    .update(payload)
    .eq("pur_id", purId)
    .eq("clt_id", current.cltId);

  if (error) throw new Error(error.message);
}

export async function deletePurchase(params: { purId: string }): Promise<void> {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/purchases",
  });

  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseServerWriteClient();

  const { error } = await supabase
    .from("purchase")
    .delete()
    .eq("pur_id", params.purId)
    .eq("clt_id", current.cltId);

  if (error) throw new Error(error.message);
}