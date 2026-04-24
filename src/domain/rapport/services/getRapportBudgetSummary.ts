

// src/domain/rapport/services/getRapportBudgetSummary.ts

import {
  listBudgetPurchaseLines,
  listBudgetSalesLines,
} from "@/domain/budget/budget-repository";

type RapportBudgetSummary = {
  chiffreAffairesBudgete: number;
  chiffreAffairesRealise: number;
  achatsBudgetes: number;
  achatsRealises: number;
};

function sum(values: Array<number | null | undefined>): number {
  return values.reduce<number>((acc, value) => acc + (value ?? 0), 0);
}

export async function getRapportBudgetSummary(params: {
  cltId: string;
  exerid: string;
}): Promise<RapportBudgetSummary> {
  const [sales, purchases] = await Promise.all([
    listBudgetSalesLines({ cltId: params.cltId, exerid: params.exerid }),
    listBudgetPurchaseLines({ cltId: params.cltId, exerid: params.exerid }),
  ]);

  return {
    chiffreAffairesBudgete: sum(sales.map((row) => row.budget_ht_eur)),
    chiffreAffairesRealise: sum(sales.map((row) => row.realized_ht_eur)),
    achatsBudgetes: sum(purchases.map((row) => row.budget_ht_eur)),
    achatsRealises: sum(purchases.map((row) => row.realized_ht_eur)),
  };
}