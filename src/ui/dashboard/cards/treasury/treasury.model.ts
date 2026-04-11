

export type TreasuryCompteModel = {
  compteId: string;
  nom: string;
  soldeEur: number;
  inclusGlobal: boolean;
};

export type TreasuryCardModel = {
  asOf: string;
  soldeGlobalEur: number;
  comptes: {
    compteId: string;
    nom: string;
    inclusGlobal: boolean;
    soldeEur: number;
  }[];
  note?: string;

  tva?: {
    tvaRestanteEur: number;
    tvaCollecteeEur: number;
    tvaDeductibleEur: number;
    tvaDejaPayeeEur: number;
  };
};