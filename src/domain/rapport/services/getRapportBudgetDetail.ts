

// src/domain/rapport/services/getRapportBudgetDetail.ts
import { listBudgetPurchaseLines, listBudgetSalesLines } from "@/domain/budget/budget-repository";

export async function getRapportBudgetDetail(params: {
  cltId: string;
  exerid: string;
}) {
  const [sales, purchases] = await Promise.all([
    listBudgetSalesLines({ cltId: params.cltId, exerid: params.exerid }),
    listBudgetPurchaseLines({ cltId: params.cltId, exerid: params.exerid }),
  ]);

  return {
    sales,
    purchases,
  };
}