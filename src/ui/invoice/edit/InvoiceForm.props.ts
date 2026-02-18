

import type { InvoiceSalesView, InvoicePurchaseView } from "@/domain/invoice/invoice-types";
import type { InvoiceSalesFormValues } from "./invoice-sales-form.types";
import type { InvoicePurchaseFormValues } from "./invoice-purchase-form.types";

export interface InvoiceSalesFormProps {
  initialInvoice: InvoiceSalesView | null;
  errors: InvoiceFormErrors;
  onChange?: (data: InvoiceSalesFormValues) => void;
}

export interface InvoicePurchaseFormProps {
  initialInvoice: InvoicePurchaseView | null;
  errors: InvoiceFormErrors;
  onChange?: (data: InvoicePurchaseFormValues) => void;
}

export interface InvoiceFormErrors {
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