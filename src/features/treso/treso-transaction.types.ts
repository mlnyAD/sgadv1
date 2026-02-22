

export type TresoMois = {
  mois: string;      // "2026-01-01" (toujours le 1er du mois)
  label: string;     // "Jan", "Fév", ...
};

export type TresoCompte = {
  compteId: string;
  nom: string;
  inclusGlobal: boolean;
  ordre: number;
};

export type TresoLigneCompte = {
  compte: TresoCompte;

  soldeInit: number;

  credits: Record<string, number>; // key = mois ISO
  debits: Record<string, number>;  // key = mois ISO
  soldes: Record<string, number>;  // key = mois ISO (calculé)
};

export type TresoChartPoint = {
  mois: string;  // "Jan", ...
  date: string;  // "2026-01-01"
  // colonnes dynamiques : [compteId]: solde
  [compteId: string]: string | number;
};

export type TresoTransactionAnnuelle = {
  exerId: string;
  annee: number;

  mois: TresoMois[];
  lignes: TresoLigneCompte[];

  // Dernier mois réellement saisi (pour l’affichage "à date")
  dernierMoisSaisi?: string; // ISO date du mois (YYYY-MM-01)

  // Solde global à date (comptes inclus global)
  soldeGlobalADate: number;

  // Courbes : uniquement comptes inclus global
  chart: {
    comptes: TresoCompte[];
    points: TresoChartPoint[];
  };
};