

// src/domain/invoice/invoice-types.ts

export interface InvoiceBaseView {
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

  operateurId: string;
  operateurNom: string | null;
  operateurPrenom: string | null;

  typeId: number;

  dateFacture: string;         // YYYY-MM-DD
  dateEcheance: string | null; // YYYY-MM-DD
  datePaiement: string | null; // YYYY-MM-DD
  dateValeur: string | null;   // YYYY-MM-DD

  reference: string | null;
  designation: string;

  montantHt: number;
  montantTax: number;
  montantTtc: number;

  opbOperationId: string | null;

  commentaires: string | null;
  lmod: string;
}

export interface InvoiceSalesView extends InvoiceBaseView {
  dealNumber: string | null;
  dealName: string | null;
  revenueTypeId: number | null;
  paymentDelayDays: number | null;
}

export interface InvoicePurchaseView extends InvoiceBaseView {
  paidByCltAmount: number;
  paidByThirdPartyAmount: number;
}