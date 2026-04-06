

import type { RevenueTypeId } from "@/domain/revenus/revenue-types.catalog";

export interface SalesFormValues {
  socId: string;
  exerId: string;

  invoiceDate: string;
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

  dealNumber: string | null;
  dealName: string | null;
  revenueTypeId: RevenueTypeId;
  paymentDelayDays: number;
}