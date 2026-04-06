

import type { SupabaseClient } from "@supabase/supabase-js";

type BudgetRow = { budget_ht_eur: number | null };
type SalesRow = { sal_amount_ht: number | null };
type PurchaseRow = { pur_amount_ht: number | null };

export async function loadSalesTotals(
  supabase: SupabaseClient,
  args: { cltId: string; exerId: string }
) {
  const { data: budRows, error: budErr } = await supabase
    .from("vw_budget_sales_lines")
    .select("budget_ht_eur")
    .eq("clt_id", args.cltId)
    .eq("exer_id", args.exerId);
  if (budErr) throw budErr;

  const { data: salRows, error: invErr } = await supabase
    .from("vw_sales_view")
    .select("sal_amount_ht")
    .eq("clt_id", args.cltId)
    .eq("exer_id", args.exerId);
  if (invErr) throw invErr;

  const totalBudget = (budRows ?? []).reduce((a, r: BudgetRow) => a + (r.budget_ht_eur ?? 0), 0);
  const totalReal = (salRows ?? []).reduce((a, r: SalesRow) => a + (r.sal_amount_ht ?? 0), 0);

  return {
    totalBudgetEur: Math.round(totalBudget),
    totalRealizedEur: Math.round(totalReal),
  };
}

export async function loadPurchaseTotals(
  supabase: SupabaseClient,
  args: { cltId: string; exerId: string }
) {
  const { data: budRows, error: budErr } = await supabase
    .from("vw_budget_purchase_lines")
    .select("budget_ht_eur")
    .eq("clt_id", args.cltId)
    .eq("exer_id", args.exerId);
  if (budErr) throw budErr;

  const { data: purRows, error: invErr } = await supabase
    .from("vw_purchase_view")
    .select("pur_amount_ht")
    .eq("clt_id", args.cltId)
    .eq("exer_id", args.exerId);
  if (invErr) throw invErr;

  const totalBudget = (budRows ?? []).reduce((a, r: BudgetRow) => a + (r.budget_ht_eur ?? 0), 0);
  const totalReal = (purRows ?? []).reduce((a, r: PurchaseRow) => a + (r.pur_amount_ht ?? 0), 0);

  return {
    totalBudgetEur: Math.round(totalBudget),
    totalRealizedEur: Math.round(totalReal),
  };
}