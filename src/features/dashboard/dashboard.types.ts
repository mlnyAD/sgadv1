

// src/features/dashboard/dashboard.types.ts
export type DashboardKpi = {
  label: string;
  valueEur: number;
  subtitle?: string;
};

export type DashboardBarPoint = {
  label: string;      // ex: "---", "Trvx", "Autre" ou "Achats", "Réalisé"
  budgetEur: number;
  realizedEur: number;
};

export type DashboardReceivables = {
  emittedHt: number;
  paid: number;
  dueNotLate: number;
  dueLate: number;
};

export type DashboardTreasury = {
  asOf: string;       // ISO date
  amountEur: number;  // placeholder tant que transaction trésorerie non définie
};

export type DashboardData = {
  exer: {
    exerId: string;
    exerCode: string | null;
    debut: string; // ISO
    fin: string;   // ISO
  };

  sales: {
    totalBudgetEur: number;
    totalRealizedEur: number;
    byRevenueType: DashboardBarPoint[]; // bar chart vertical multi
  };

purchases: {
  totalBudgetEur: number;
  totalRealizedEur: number;
  byCentreCout: DashboardBarPoint[]; // budget vs réalisé (familles pour l’instant)
};

  receivables: DashboardReceivables;

  treasury?: DashboardTreasury; // optional pour l’instant
};