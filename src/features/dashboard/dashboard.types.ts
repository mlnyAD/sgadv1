

// src/features/dashboard/dashboard.types.ts
export type DashboardKpi = {
  label: string;
  valueEur: number;
  subtitle?: string;
};

export type DashboardBarPoint = {
  label: string;
  budgetEur: number;
  realizedEur: number;
};

export type DashboardPurchaseFamilyRow = {
  familleId: number;
  label: string;
  budgetEur: number;
  realizedEur: number;
};

export type DashboardReceivables = {
  emittedHt: number;
  paid: number;
  dueNotLate: number;
  dueLate: number;
};

export type DashboardTreasuryAccount = {
  compteId: string;
  nom: string;
  inclusGlobal: boolean;
  soldeEur: number;
};

export type DashboardTreasury = {
  asOf: string;
  amountEur: number;
  soldeGlobalEur: number;
  comptes: DashboardTreasuryAccount[];
};

export type DashboardData = {
  exer: {
    exerId: string;
    exerCode: string | null;
    debut: string;
    fin: string;
  };

  sales: {
    totalBudgetEur: number;
    totalRealizedEur: number;
    byRevenueType: DashboardBarPoint[];
  };

  purchases: {
    totalBudgetEur: number;
    totalRealizedEur: number;
    rows: DashboardPurchaseFamilyRow[];
  };

  receivables: DashboardReceivables;

  treasury?: DashboardTreasury;
  tva?: DashboardTva;
};

export type DashboardTva = {
  tvaCollecteeEur: number;
  tvaDeductibleEur: number;
  tvaDejaPayeeEur: number;
  tvaRestanteEur: number;
};