export type PurchaseView = {
  id: string;

  clientId: string;
  clientNom: string | null;

  societeId: string;
  societeNom: string | null;

  exerciceId: string;
  exerciceCode: string | null;

  centreCoutId: string;
  centreCoutCode: string | null;
  centreCoutLibelle: string | null;

  operateurId: string | null;
  operateurNom: string | null;
  operateurPrenom: string | null;

  dateFacture: string;
  dateEcheance: string | null;
  datePaiement: string | null;
  dateValeur: string | null;

  reference: string | null;
  designation: string;

  montantHt: number;
  montantTax: number;
  montantTtc: number;

  opbOperationId: string | null;
  commentaires: string | null;
  lmod: string;

  paidByCltAmount: number;
  paidByThirdPartyAmount: number;
};

