

import type { SalesView, } from "@/domain/sales/sales-types";
import type { SalesFormValues } from "./sales-form.types";

export interface SalesFormProps {
  initialSales: SalesView | null;
  errors: SalesFormErrors;
  onChange?: (data: SalesFormValues) => void;
}

export interface SalesFormProps {
  initialSales: SalesView | null;
  errors: SalesFormErrors;
  onChange?: (data: SalesFormValues) => void;
}

export interface SalesFormErrors {
  global?: string[];
  fields?: {
    socId?: string;
    exerId?: string;
    operId?: string;

    invoiceDate?: string;
    dueDate?: string;
    paymentDate?: string;
    bankValueDate?: string;

    reference?: string;
    designation?: string;

    amountHt?: string;
    amountTax?: string;
    amountTtc?: string;

    comments?: string;
    opbOperationId?: string;

    // sales
    dealNumber?: string;
    dealName?: string;
    revenueTypeId?: string;
    paymentDelayDays?: string;

    // purchase
    paidByCltAmount?: string;
    paidByThirdPartyAmount?: string;
  };
}