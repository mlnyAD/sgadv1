

// src/ui/sales/sales.types.ts

export interface SalesListItem {
  id: string;

  exerciceId: string | null;
  societeId: string | null;
  revenueTypeId: number | null;

  exerciceCode: string | null;
  societeNom: string | null;

  dateFacture: string;
  designation: string;

  montantHt: number;
  montantTax: number;
  montantTtc: number;

  dateValeur: string | null;

  reference: string | null;

  comments: string | null;
}