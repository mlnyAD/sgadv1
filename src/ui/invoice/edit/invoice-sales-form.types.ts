

export interface InvoiceSalesFormValues {
  socId: string;
  exerId: string;
  ccId: string;

  invType: number; // forcé à 1 dans l'IHM (ventes)

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

  // sales (extension)
  dealNumber: string | null;
  dealName: string | null;
  revenueTypeId: number | null;
  paymentDelayDays: number | null;
}