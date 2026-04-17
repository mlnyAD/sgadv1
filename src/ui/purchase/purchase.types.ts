

// src/ui/purchase/purchase.types.ts

export type PurchaseListItem = {
  id: string;

  exerciceId: string | null;
  societeId: string | null;
  centreCoutId: string | null;

  exerciceCode: string | null;
  societeNom: string | null;
  centreCoutCode: string | null;

  dateFacture: string;
  datePaiement: string | null;
  dateValeur: string | null;

  designation: string;
  reference: string | null;

  montantHt: number;
  montantTax: number;
  montantTtc: number;

  paidByCltAmount: number;
  paidByThirdPartyAmount: number;

  comments: string | null;
};