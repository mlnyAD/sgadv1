

import type { BudgetPurchaseLineRow } from "@/domain/budget/budget-repository";
import type { RapportAchatsData } from "../types";

function sum(values: Array<number | null | undefined>): number {
  return values.reduce<number>((acc, value) => acc + (value ?? 0), 0);
}

export function mapRapportAchats(
  rows: BudgetPurchaseLineRow[],
): RapportAchatsData | null {
  if (rows.length === 0) {
    return null;
  }

  const totalBudgetEur = sum(rows.map((row) => row.budget_ht_eur));
  const totalRealizedEur = sum(rows.map((row) => row.realized_ht_eur));

  return {
    totalBudgetEur,
    totalRealizedEur,
    ecartEur: totalRealizedEur - totalBudgetEur,
    pctRealise:
      totalBudgetEur > 0
        ? (totalRealizedEur / totalBudgetEur) * 100
        : null,
  };
}