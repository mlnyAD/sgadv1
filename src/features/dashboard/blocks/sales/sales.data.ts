

// src/features/dashboard/blocks/sales/sales.data.ts

import type { DashboardBarPoint } from "@/features/dashboard/dashboard.types";
import {
  REVENUE_TYPES,
  toRevenueTypeId,
  getRevenueTypeById,
} from "@/domain/revenus/revenue-types.catalog";
import type { SupabaseClient } from "@supabase/supabase-js";

type BudgetRow = {
  revenue_type_id: number | null;
  budget_ht_eur: number | null;
};

type SalesRow = {
  sal_revenue_type_id: number | null;
  sal_amount_ht: number | null;
};

export async function loadSalesBlock(
  supabase: SupabaseClient,
  cltId: string,
  exerId: string
): Promise<{
  totalBudgetEur: number;
  totalRealizedEur: number;
  byRevenueType: DashboardBarPoint[];
}> {
  const { data: budRows, error: budErr } = await supabase
    .from("vw_budget_sales_lines")
    .select("revenue_type_id, budget_ht_eur")
    .eq("clt_id", cltId)
    .eq("exer_id", exerId);

  if (budErr) throw budErr;

  const { data: salRows, error: invErr } = await supabase
    .from("vw_sales_view")
    .select("sal_revenue_type_id, sal_amount_ht")
    .eq("clt_id", cltId)
    .eq("exer_id", exerId);

  if (invErr) throw invErr;

  const budgetByType = new Map<number, number>();
  let totalBudget = 0;

  for (const r of (budRows ?? []) as BudgetRow[]) {
    const typeId = r.revenue_type_id ?? 1;
    const v = r.budget_ht_eur ?? 0;
    totalBudget += v;
    budgetByType.set(typeId, (budgetByType.get(typeId) ?? 0) + v);
  }

  const realizedByType = new Map<number, number>();
  let totalRealized = 0;

  for (const r of (salRows ?? []) as SalesRow[]) {
    const typeId = r.sal_revenue_type_id ?? 1;
    const v = r.sal_amount_ht ?? 0;
    totalRealized += v;
    realizedByType.set(typeId, (realizedByType.get(typeId) ?? 0) + v);
  }

  const typeIds = new Set<number>([
    ...REVENUE_TYPES.map((t) => t.id),
    ...Array.from(budgetByType.keys()),
    ...Array.from(realizedByType.keys()),
  ]);

  const byRevenueType: DashboardBarPoint[] = Array.from(typeIds)
    .sort((a, b) => a - b)
    .map((id) => {
      const revenueTypeId = toRevenueTypeId(id);
      const rt = revenueTypeId != null ? getRevenueTypeById(revenueTypeId) : null;

      return {
        label: rt?.libelle ?? `Type ${id}`,
        budgetEur: Math.round(budgetByType.get(id) ?? 0),
        realizedEur: Math.round(realizedByType.get(id) ?? 0),
      };
    });

  return {
    totalBudgetEur: Math.round(totalBudget),
    totalRealizedEur: Math.round(totalRealized),
    byRevenueType,
  };
}