

// src/features/dashboard/blocks/sales/sales.data.ts

import type { DashboardBarPoint } from "@/features/dashboard/dashboard.types";
import {
  REVENUE_TYPES,
  toRevenueTypeId,
  getRevenueTypeById,
} from "@/domain/invoice/invoice-types.catalog";
import type { SupabaseClient } from "@supabase/supabase-js";

type BudgetRow = {
  revenue_type_id: number | null;
  budget_ht_eur: number | null;
};

type InvoiceSalesRow = {
  invs_revenue_type: number | null;
  inv_amount_ht: number | null;
};

export async function loadSalesBlock(
  supabase: SupabaseClient,
  exerId: string
): Promise<{
  totalBudgetEur: number;
  totalRealizedEur: number;
  byRevenueType: DashboardBarPoint[];
}> {
  const { data: budRows, error: budErr } = await supabase
    .from("vw_budget_sales_lines")
    .select("revenue_type_id, budget_ht_eur")
    .eq("exer_id", exerId);

  if (budErr) throw budErr;

  const { data: invRows, error: invErr } = await supabase
    .from("vw_invoice_sales_view")
    .select("invs_revenue_type, inv_amount_ht")
    .eq("exer_id", exerId);

  if (invErr) throw invErr;

  // Budget par type
  const budgetByType = new Map<number, number>();
  let totalBudget = 0;

  for (const r of (budRows ?? []) as BudgetRow[]) {
    const typeId = r.revenue_type_id ?? 1; // fallback "---"
    const v = r.budget_ht_eur ?? 0;
    totalBudget += v;
    budgetByType.set(typeId, (budgetByType.get(typeId) ?? 0) + v);
  }

  // Réalisé par type (factures émises HT, avoirs négatifs inclus)
  const realizedByType = new Map<number, number>();
  let totalRealized = 0;

  for (const r of (invRows ?? []) as InvoiceSalesRow[]) {
    const typeId = r.invs_revenue_type ?? 1; // fallback "---"
    const v = r.inv_amount_ht ?? 0;
    totalRealized += v;
    realizedByType.set(typeId, (realizedByType.get(typeId) ?? 0) + v);
  }

  // Merge : types connus + types présents en DB
  const typeIds = new Set<number>([
    ...REVENUE_TYPES.map((t) => t.id),
    ...Array.from(budgetByType.keys()),
    ...Array.from(realizedByType.keys()),
  ]);

  const byRevenueType: DashboardBarPoint[] = Array.from(typeIds)
    .sort((a, b) => a - b)
    .map((id) => {
      const rt = getRevenueTypeById(toRevenueTypeId(id));
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