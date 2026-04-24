

export type RapportOptionKey =
  | "bilanFinancier"
  | "detailBudget"

export type RapportSectionKey =
  | "chiffreAffaires"
  | "factures"
  | "achats"
  | "tresorerie"
  | "remboursements"
  | "syntheseFiscale"
  | "bilanFinancier"
  | "detailBudget";

export type RapportChiffreAffairesData = {
  totalBudgetEur: number;
  totalRealizedEur: number;
  ecartEur: number;
  pctRealise: number | null;
};

export interface RapportFilters {
  exerId: string;
  exerCode: string;
  options: RapportOptionKey[];
}

export interface RapportSection<T = unknown> {
  key: RapportSectionKey;
  title: string;
  required: boolean;
  visible: boolean;
  hasData: boolean;
  data: T | null;
}

export interface RapportFinancierViewModel {
  clientName: string;
  dateEdition: string;
  exercice: string;
  sections: RapportSection[];
}

export type RapportAchatsData = {
  totalBudgetEur: number;
  totalRealizedEur: number;
  ecartEur: number;
  pctRealise: number | null;
};

export type RapportFacturesData = {
  emisesEur: number;
  payeesEur: number;
  enAttenteEur: number;
  enRetardEur: number;
};

export type RapportTresorerieData = {
  asOf: string;
  soldeGlobalEur: number;
  comptes: {
    compteId: string;
    nom: string;
    inclusGlobal: boolean;
    soldeEur: number;
  }[];
  tva?: {
    tvaRestanteEur: number;
    tvaCollecteeEur: number;
    tvaDeductibleEur: number;
    tvaDejaPayeeEur: number;
  };
};

export type RapportRemboursementsData = {
  toRefundAmount: number;
  refundedAmount: number;
  remainingAmount: number;
};

export type RapportSyntheseFiscaleData = {
  rows: {
    fiscTypeId: number;
    code: string;
    libelle: string;
    montantEur: number;
  }[];
  totalEur: number;
};

export type RapportBilanFinancierData = {
  rows: {
    indicateur: string;
    budgetEur: number;
    toDateEur: number;
  }[];
};