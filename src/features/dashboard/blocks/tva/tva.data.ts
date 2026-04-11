

import type { SupabaseClient } from "@supabase/supabase-js";

type SalesTaxRow = {
  sal_amount_tax: number | null;
};

type PurchaseTaxRow = {
  pur_amount_tax: number | null;
};

type FiscRow = {
  fisc_type_id: number | null;
  fisc_montant: string | null;
};

function toAmount(value: string | number | null | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value !== "string") return 0;

  const normalized = value.replace(",", ".").trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

export async function loadTvaBlock(
  supabase: SupabaseClient,
  cltId: string,
  exerId: string
) {
  const { data: salesRows, error: salesErr } = await supabase
    .from("vw_sales_view")
    .select("sal_amount_tax")
    .eq("clt_id", cltId)
    .eq("exer_id", exerId);

  if (salesErr) throw salesErr;

  const { data: purchaseRows, error: purchaseErr } = await supabase
    .from("vw_purchase_view")
    .select("pur_amount_tax")
    .eq("clt_id", cltId)
    .eq("exer_id", exerId);

  if (purchaseErr) throw purchaseErr;

  const { data: fiscRows, error: fiscErr } = await supabase
    .from("vw_fisc_view")
    .select("fisc_type_id, fisc_montant")
    .eq("fisc_clt_id", cltId)
    .eq("fisc_exer_id", exerId)
    .eq("fisc_type_id", 1);

  if (fiscErr) throw fiscErr;

  const tvaCollecteeEur = Math.round(
    ((salesRows ?? []) as SalesTaxRow[]).reduce(
      (sum, row) => sum + (row.sal_amount_tax ?? 0),
      0
    )
  );

  const tvaDeductibleEur = Math.round(
    ((purchaseRows ?? []) as PurchaseTaxRow[]).reduce(
      (sum, row) => sum + (row.pur_amount_tax ?? 0),
      0
    )
  );

  const tvaDejaPayeeEur = Math.round(
    ((fiscRows ?? []) as FiscRow[]).reduce(
      (sum, row) => sum + toAmount(row.fisc_montant),
      0
    )
  );

  const tvaRestanteEur = Math.round(
    tvaCollecteeEur - tvaDeductibleEur - tvaDejaPayeeEur
  );

  return {
    tvaCollecteeEur,
    tvaDeductibleEur,
    tvaDejaPayeeEur,
    tvaRestanteEur,
  };
}