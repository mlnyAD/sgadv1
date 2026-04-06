

import type { PurchaseView, } from "@/domain/purchase/purchase-types";
import type { PurchaseFormValues } from "./purchase-form.types";

export interface PurchaseFormProps {
  initialPurchase: PurchaseView | null;
  errors: PurchaseFormErrors;
  onChange?: (data: PurchaseFormValues) => void;
}

export interface PurchaseFormProps {
  initialPurchase: PurchaseView | null;
  errors: PurchaseFormErrors;
  onChange?: (data: PurchaseFormValues) => void;
}

export interface PurchaseFormErrors {
  global?: string[];
  fields?: {
    socId?: string;
    exerId?: string;
    ccId?: string;
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