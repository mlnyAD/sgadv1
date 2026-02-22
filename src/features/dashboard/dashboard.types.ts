

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

export type DashboardTreasuryAccount = {
  compteId: string;
  nom: string;
  inclusGlobal: boolean;
  soldeEur: number;
};

export type DashboardTreasury = {
  asOf: string;        // ISO date (mois du dernier solde connu)
  amountEur: number;   // solde global (pour compat compat)
  soldeGlobalEur: number;
  comptes: DashboardTreasuryAccount[];
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