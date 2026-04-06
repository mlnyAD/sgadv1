

export interface PurchaseFormValues {
  socId: string;
  exerId: string;
  ccId: string;

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

  paidByCltAmount: number;
  paidByThirdPartyAmount: number;
}