

export interface SalesView {
  id: string;

  clientId: string;
  clientNom: string | null;

  societeId: string;
  societeNom: string | null;

  exerciceId: string;
  exerciceCode: string | null;

  operateurId: string | null;
  operateurNom: string | null;
  operateurPrenom: string | null;

  dateFacture: string;
  dateEcheance: string | null;
  dateValeur: string | null;

  reference: string | null;
  designation: string;

  montantHt: number;
  montantTax: number;
  montantTtc: number;

  opbOperationId: string | null;
  commentaires: string | null;
  lmod: string;

  dealNumber: string | null;
  dealName: string | null;
  revenueTypeId: number | null;
  paymentDelayDays: number;
}