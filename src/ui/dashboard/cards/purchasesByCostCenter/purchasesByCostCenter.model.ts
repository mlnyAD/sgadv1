

import type { DashboardPurchaseFamilyRow } from "@/features/dashboard/dashboard.types";

export type PurchasesByCostCenterCardModel = {
  rows: DashboardPurchaseFamilyRow[];
  totalBudgetEur: number;
  totalRealizedEur: number;
};

export type PurchasesByCostCenterRow = {
  familleId: number;
  label: string;
  budgetEur: number;
  realizedEur: number;
};
