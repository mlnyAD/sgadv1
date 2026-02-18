

export interface InvoicePurchaseFormValues {
  socId: string;
  exerId: string;
  ccId: string;

  invType: number; // forcé à 2 dans l'IHM (achats)

  invoiceDate: string; // YYYY-MM-DD
  dueDate: string | null;
  paymentDate: string | null;
  bankValueDate: string | null;

  reference: string | null;
  designation: string;

  amountHt: number;
  amountTax: number;
  amountTtc: number;

  comments: string | null;
  opbOperationId: string | null;

  // purchase (extension)
  paidByCltAmount: number;
  paidByThirdPartyAmount: number;
}