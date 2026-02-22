

export type TreasuryCompteModel = {
  compteId: string;
  nom: string;
  soldeEur: number;
  inclusGlobal: boolean;
};

export type TreasuryCardModel = {
  asOf: string;
  soldeGlobalEur: number;
  comptes: TreasuryCompteModel[];
  note?: string;
};