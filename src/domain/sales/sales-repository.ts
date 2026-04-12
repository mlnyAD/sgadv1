

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerWriteClient } from "@/lib/supabase/server-write";
import { getCurrentClient } from "@/domain/session/current-client";

import type { SalesListItem } from "@/ui/sales/sales.types";
import type {
  SalesRow,
  SalesInsert,
  SalesUpdate,
} from "@/domain/_db/rows";

import { SELECT_SALES_VIEW } from "./sales.select";
import { mapSalesRowToView } from "./sales-mapper";
import type { SalesView } from "./sales-types";

/* ================================================================== */
/* READ                                                                */
/* ================================================================== */

export async function listSales(params: {
  cltId: string;
  page: number;
  pageSize: number;
  search?: string;
  exerId?: string;
  socId?: string;
}): Promise<{ data: SalesListItem[]; total: number }> {
  const { cltId, page, pageSize, search, exerId, socId } = params;

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_sales_view")
    .select(
      [
        "sal_id",
        "exer_code",
        "soc_nom",
        "sal_invoice_date",
        "sal_designation",
        "sal_amount_ht",
        "sal_amount_tax",
        "sal_amount_ttc",
        "sal_payment_date",
        "sal_bank_value_date",
        "sal_reference",
      ].join(", "),
      { count: "exact" }
    )
    .eq("clt_id", cltId)
    .order("sal_invoice_date", { ascending: false });

  if (search) {
    query = query.or(
      `sal_reference.ilike.%${search}%,sal_designation.ilike.%${search}%`
    );
  }

  if (exerId) query = query.eq("exer_id", exerId);
  if (socId) query = query.eq("soc_id", socId);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);

  type SalesListRow = {
    sal_id: string;
    exer_code: string | null;
    soc_nom: string | null;
    sal_invoice_date: string;
    sal_designation: string | null;
    sal_amount_ht: number | null;
    sal_amount_tax: number | null;
    sal_amount_ttc: number | null;
    sal_payment_date: string | null;
    sal_bank_value_date: string | null;
    sal_reference: string | null;
  };

  const rows = (data ?? []) as unknown as SalesListRow[];

  return {
    data: rows.map(
      (r): SalesListItem => ({
        id: r.sal_id,
        exerciceCode: r.exer_code ?? null,
        societeNom: r.soc_nom ?? null,
        dateFacture: r.sal_invoice_date,
        designation: r.sal_designation ?? "",
        montantHt: r.sal_amount_ht ?? 0,
        montantTax: r.sal_amount_tax ?? 0,
        montantTtc: r.sal_amount_ttc ?? 0,
        datePaiement: r.sal_payment_date ?? null,
        dateValeur: r.sal_bank_value_date ?? null,
        reference: r.sal_reference ?? null,
      })
    ),
    total: count ?? 0,
  };
}

export async function getSalesById(params: {
  cltId: string;
  salId: string;
}): Promise<SalesView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_sales_view")
    .select(SELECT_SALES_VIEW)
    .eq("sal_id", params.salId)
    .eq("clt_id", params.cltId)
    .maybeSingle();

  if (error || !data) return null;

  return mapSalesRowToView(data as unknown as SalesRow);
}

/* ================================================================== */
/* WRITE                                                               */
/* ================================================================== */

export async function createSales(
  payload: Omit<SalesInsert, "clt_id" | "sal_id">
): Promise<{ salId: string }> {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/sales",
  });

  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseServerWriteClient();

  const { data: created, error } = await supabase
    .from("sales")
    .insert({
      ...payload,
      clt_id: current.cltId,
    })
    .select("sal_id")
    .maybeSingle();

  if (error || !created?.sal_id) {
    throw new Error(error?.message ?? "Création vente impossible");
  }

  return { salId: created.sal_id };
}

export async function updateSales(
  salId: string,
  payload: SalesUpdate
): Promise<void> {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/sales",
  });

  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseServerWriteClient();

  const { error } = await supabase
    .from("sales")
    .update(payload)
    .eq("sal_id", salId)
    .eq("clt_id", current.cltId);

  if (error) throw new Error(error.message);
}

export async function deleteSales(params: { salId: string }): Promise<void> {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/sales",
  });

  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseServerWriteClient();

  const { error } = await supabase
    .from("sales")
    .delete()
    .eq("sal_id", params.salId)
    .eq("clt_id", current.cltId);

  if (error) throw new Error(error.message);
}