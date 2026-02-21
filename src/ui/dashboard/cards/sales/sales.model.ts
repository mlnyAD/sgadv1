

export type SalesBarItem = { label: string; budgetEur: number; realizedEur: number };

export type SalesCardModel = {
  totalBudgetEur: number;
  totalRealizedEur: number;
  byRevenueType: SalesBarItem[];
};