

// src/ui/invoice/invoice.types.ts

export interface InvoiceListItem {
  id: string;

  exerciceCode: string | null;
  societeNom: string | null;

  dateFacture: string;
  designation: string;

  montantHt: number;
  montantTax: number;
  montantTtc: number;

  datePaiement: string | null;
  dateValeur: string | null;

  reference: string | null;
  centreCoutCode: string | null;
}