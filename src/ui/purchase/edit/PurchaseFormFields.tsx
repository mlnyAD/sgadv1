

"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { PurchaseView } from "@/domain/purchase/purchase-types";
import type { PurchaseFormErrors } from "./PurchaseForm.props";
import type { PurchaseFormValues } from "./purchase-form.types";
import { toDateInputValue } from "@/helpers/date";

// fields (communs)
import { PurchaseSocieteField } from "@/ui/purchase/fields/PurchaseSocieteField";
import { PurchaseExerciceField } from "@/ui/purchase/fields/PurchaseExerciceField";
import { PurchaseCentreCoutField } from "@/ui/purchase/fields/PurchaseCentreCoutField";
import { PurchaseDateField } from "@/ui/purchase/fields/PurchaseDateField";
import { PurchaseReferenceField } from "@/ui/purchase/fields/PurchaseReferenceField";
import { PurchaseDesignationField } from "@/ui/purchase/fields/PurchaseDesignationField";
import { PurchaseAmountHtField } from "@/ui/purchase/fields/PurchaseAmountHtField";
import { PurchaseAmountTaxField } from "@/ui/purchase/fields/PurchaseAmountTaxField";
import { PurchaseAmountTtcField } from "@/ui/purchase/fields/PurchaseAmountTtcField";
import { PurchaseCommentsField } from "@/ui/purchase/fields/PurchaseCommentsFields";
import { PurchasePaidByCltAmountField } from "@/ui/purchase/fields/PurchasePaidByCltAmountField";
import { PurchasePaidByThirdPartyAmountField } from "@/ui/purchase/fields/PurchasePaidByThirdPartyAmountField";
import { PurchaseDateValueField } from "../fields/PurchaseDateValueField";

/* ------------------------------------------------------------------ */
/* Validation schemas (1 par champ)                                   */
/* ------------------------------------------------------------------ */

const idSchema = z.string().min(1, "Champ requis");
const dateSchema = z
  .string()
  .min(1, "Champ requis")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu : YYYY-MM-DD");

const designationSchema = z.string().trim().min(1, "Champ requis");
const refSchema = z.string().trim().optional();
const moneySchema = z.number().finite();
const commentsSchema = z.string().trim().optional();

/* ------------------------------------------------------------------ */
/* Utils                                                              */
/* ------------------------------------------------------------------ */

function getFieldError(
  value: unknown,
  schema: z.ZodTypeAny,
  serverError?: string | null
): string | null {
  const parsed = schema.safeParse(value);
  if (!parsed.success) return parsed.error.issues[0].message;
  return serverError ?? null;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

/* ------------------------------------------------------------------ */
/* Props                                                              */
/* ------------------------------------------------------------------ */

type Option = {
  value: string;
  label: string;
  isActive?: boolean;
};

interface Props {
  initialPurchase: PurchaseView | null;
  errors: PurchaseFormErrors;
  onChange?: (data: PurchaseFormValues) => void;

  options: {
    societes: Option[];
    exercices: Option[];
    centresCout: Option[];
  };
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function PurchaseFormFields({
  initialPurchase,
  errors,
  onChange,
  options,
}: Props) {
	
 const defaultExerciceId =
  initialPurchase?.exerciceId ??
  options.exercices[0]?.value ??
  "";

  // commun
  const [socId, setSocId] = useState(initialPurchase?.societeId ?? "");
  const [exerId, setExerId] = useState(defaultExerciceId);
  const [ccId, setCcId] = useState(initialPurchase?.centreCoutId ?? "");

  const [invoiceDate, setInvoiceDate] = useState<string>(
    toDateInputValue(initialPurchase?.dateFacture)
  );
  const [purchaseValueDate, setPurchaseValueDate] = useState<string>(
    toDateInputValue(initialPurchase?.dateValeur)
  );

  const [reference, setReference] = useState(initialPurchase?.reference ?? "");
  const [designation, setDesignation] = useState(initialPurchase?.designation ?? "");

  const [amountHt, setAmountHt] = useState<number>(initialPurchase?.montantHt ?? 0);
  const [amountTax, setAmountTax] = useState<number>(initialPurchase?.montantTax ?? 0);
  const [amountTtc, setAmountTtc] = useState<number>(initialPurchase?.montantTtc ?? 0);

  const [comments, setComments] = useState(initialPurchase?.commentaires ?? "");

  const [paidByCltAmount, setPaidByCltAmount] = useState(
    initialPurchase?.paidByCltAmount ?? 0
  );
  const [paidByThirdPartyAmount, setPaidByThirdPartyAmount] = useState(
    initialPurchase?.paidByThirdPartyAmount ?? 0
  );

  /* ---------------------------------------------------------------- */
  /* Auto-calcul ergonomique en création uniquement                   */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (initialPurchase) return;

    const ht = Number(amountHt || 0);
    const defaultTax = roundMoney(ht * 0.2);

    setAmountTax(defaultTax);
    setAmountTtc(roundMoney(ht + defaultTax));
    setPaidByCltAmount(roundMoney(ht + defaultTax));
  }, [amountHt, initialPurchase]);

  useEffect(() => {
    if (initialPurchase) return;

    const ht = Number(amountHt || 0);
    const tax = Number(amountTax || 0);
    const total = roundMoney(ht + tax);

    setAmountTtc(total);
    setPaidByCltAmount(total);
  }, [amountTax, amountHt, initialPurchase]);

  // errors
  const socIdError = getFieldError(socId, idSchema, errors?.fields?.socId);
  const exerIdError = getFieldError(exerId, idSchema, errors?.fields?.exerId);
  const ccIdError = getFieldError(ccId, idSchema, errors?.fields?.ccId);

  const invoiceDateError = getFieldError(
    invoiceDate,
    dateSchema,
    errors?.fields?.invoiceDate
  );

  const purchaseValueDateError = getFieldError(
    purchaseValueDate,
    dateSchema,
    errors?.fields?.bankValueDate
  );

  const referenceError = getFieldError(reference, refSchema, errors?.fields?.reference);
  const designationError = getFieldError(
    designation,
    designationSchema,
    errors?.fields?.designation
  );

  const amountHtError = getFieldError(amountHt, moneySchema, errors?.fields?.amountHt);
  const amountTaxError = getFieldError(amountTax, moneySchema, errors?.fields?.amountTax);
  const amountTtcError = getFieldError(amountTtc, moneySchema, errors?.fields?.amountTtc);

  const commentsError = getFieldError(comments, commentsSchema, errors?.fields?.comments);

  const paidByCltAmountError = getFieldError(
    paidByCltAmount,
    moneySchema,
    errors?.fields?.paidByCltAmount
  );
  const paidByThirdPartyAmountError = getFieldError(
    paidByThirdPartyAmount,
    moneySchema,
    errors?.fields?.paidByThirdPartyAmount
  );

  useEffect(() => {
    onChange?.({
      socId,
      exerId,
      ccId,

      invoiceDate,
      dueDate: null,
      paymentDate: null,
      bankValueDate: purchaseValueDate ? purchaseValueDate : null,

      reference: reference ? reference : null,
      designation,

      amountHt,
      amountTax,
      amountTtc,

      comments: comments ? comments : null,
      opbOperationId: null,

      paidByCltAmount,
      paidByThirdPartyAmount,
    });
  }, [
    socId,
    exerId,
    ccId,
    invoiceDate,
    purchaseValueDate,
    reference,
    designation,
    amountHt,
    amountTax,
    amountTtc,
    comments,
    paidByCltAmount,
    paidByThirdPartyAmount,
    onChange,
  ]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-10 gap-y-0 lg:grid-cols-2">
        <PurchaseSocieteField
          value={socId}
          onChange={setSocId}
          error={socIdError}
          options={options.societes}
        />

        <PurchaseExerciceField
          value={exerId}
          onChange={setExerId}
          error={exerIdError}
          options={options.exercices}
        />

        <PurchaseCentreCoutField
          value={ccId}
          onChange={setCcId}
          error={ccIdError}
          options={options.centresCout}
        />

        <PurchaseDateField
          value={invoiceDate}
          onChange={setInvoiceDate}
          error={invoiceDateError}
        />

        <PurchaseDateValueField
          value={purchaseValueDate}
          onChange={setPurchaseValueDate}
          error={purchaseValueDateError}
        />

        <PurchaseReferenceField
          value={reference}
          onChange={setReference}
          error={referenceError}
        />

        <PurchaseDesignationField
          value={designation}
          onChange={setDesignation}
          error={designationError}
        />

        <PurchaseAmountHtField
          value={amountHt}
          onChange={setAmountHt}
          error={amountHtError}
        />

        <PurchaseAmountTaxField
          value={amountTax}
          onChange={setAmountTax}
          error={amountTaxError}
        />

        <PurchaseAmountTtcField
          value={amountTtc}
          onChange={setAmountTtc}
          error={amountTtcError}
        />

        <PurchaseCommentsField
          value={comments}
          onChange={setComments}
          error={commentsError}
        />

        <PurchasePaidByCltAmountField
          value={paidByCltAmount}
          onChange={setPaidByCltAmount}
          error={paidByCltAmountError}
        />

        <PurchasePaidByThirdPartyAmountField
          value={paidByThirdPartyAmount}
          onChange={setPaidByThirdPartyAmount}
          error={paidByThirdPartyAmountError}
        />

        {errors.global?.length ? (
          <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            <ul className="list-disc pl-5">
              {errors.global.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}