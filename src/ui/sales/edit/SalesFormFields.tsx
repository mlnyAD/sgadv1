

"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { SalesView } from "@/domain/sales/sales-types";
import type { SalesFormErrors } from "./SalesForm.props";
import type { SalesFormValues } from "./sales-form.types";
import { toDateInputValue } from "@/helpers/date";

// fields (communs)
import { SalesSocieteField } from "@/ui/sales/fields/SalesSocieteField";
import { SalesExerciceField } from "@/ui/sales/fields/SalesExerciceField";
import { SalesDateField } from "@/ui/sales/fields/SalesDateField";
import { SalesReferenceField } from "@/ui/sales/fields/SalesReferenceField";
import { SalesDesignationField } from "@/ui/sales/fields/SalesDesignationField";
import { SalesAmountHtField } from "@/ui/sales/fields/SalesAmountHtField";
import { SalesAmountTaxField } from "@/ui/sales/fields/SalesAmountTaxField";
import { SalesAmountTtcField } from "@/ui/sales/fields/SalesAmountTtcField";
import { SalesCommentsField } from "@/ui/sales/fields/SalesCommentsFields";
import { SelectOption } from "@/components/fields/types";
import { SalesDealNameField } from "../fields/SalesDealNameField";
import { SalesDealNumberField } from "../fields/SalesDealNumberField";
import { SalesRevenueTypeIdField } from "../fields/SalesRevenueTypeIdField";
import { SalesPaymentDelayDaysField } from "../fields/SalesPaymentDelayDaysFields";
import { toRevenueTypeId, type RevenueTypeId } from "@/domain/revenus/revenue-types.catalog";
import { SalesDateValueField } from "../fields/SalesDateValueField";

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
const revenueTypeIdSchema = z.number().int().min(1, "Champ requis");
const paymentDelayDaysSchema = z.number().int().nonnegative();

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
interface Props {
  initialSales: SalesView | null;
  errors: SalesFormErrors;
  options: {
    societes: SelectOption[];
    exercices: SelectOption[];
  };
  onChange?: (data: SalesFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function SalesFormFields({
  initialSales,
  errors,
  onChange,
  options,
}: Props) {
  const defaultExerciceId =
    initialSales?.exerciceId ??
    options.exercices[0]?.value ??
    "";

  // commun
  const [socId, setSocId] = useState(initialSales?.societeId ?? "");
  const [exerId, setExerId] = useState(defaultExerciceId);

  const [invoiceDate, setInvoiceDate] = useState<string>(
    toDateInputValue(initialSales?.dateFacture)
  );
  const [salesValueDate, setSalesValueDate] = useState<string>(
    toDateInputValue(initialSales?.dateValeur)
  );

  const [reference, setReference] = useState(initialSales?.reference ?? "");
  const [designation, setDesignation] = useState(initialSales?.designation ?? "");

  const [amountHt, setAmountHt] = useState<number>(initialSales?.montantHt ?? 0);
  const [amountTax, setAmountTax] = useState<number>(initialSales?.montantTax ?? 0);
  const [amountTtc, setAmountTtc] = useState<number>(initialSales?.montantTtc ?? 0);

  const [comments, setComments] = useState(initialSales?.commentaires ?? "");

  const [dealName, setDealName] = useState(initialSales?.dealName ?? "");
  const [dealNumber, setDealNumber] = useState(initialSales?.dealNumber ?? "");
  const [paymentDelayDays, setPaymentDelayDays] = useState<number>(
    initialSales?.paymentDelayDays ?? 60
  );

  const [revenueTypeId, setRevenueTypeId] = useState<RevenueTypeId>(
    initialSales?.revenueTypeId == null
      ? 1
      : toRevenueTypeId(initialSales.revenueTypeId) ?? 1
  );

  /* ---------------------------------------------------------------- */
  /* Auto-calcul ergonomique en création uniquement                   */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (initialSales) return;

    const ht = Number(amountHt || 0);
    const defaultTax = roundMoney(ht * 0.2);

    setAmountTax(defaultTax);
    setAmountTtc(roundMoney(ht + defaultTax));
  }, [amountHt, initialSales]);

  useEffect(() => {
    if (initialSales) return;

    const ht = Number(amountHt || 0);
    const tax = Number(amountTax || 0);

    setAmountTtc(roundMoney(ht + tax));
  }, [amountHt, amountTax, initialSales]);

  // errors
  const socIdError = getFieldError(socId, idSchema, errors?.fields?.socId);
  const exerIdError = getFieldError(exerId, idSchema, errors?.fields?.exerId);

  const invoiceDateError = getFieldError(
    invoiceDate,
    dateSchema,
    errors?.fields?.invoiceDate
  );

  const salesValueDateError = getFieldError(
    salesValueDate,
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

  const dealNumberError = getFieldError(
    dealNumber,
    commentsSchema,
    errors?.fields?.dealNumber
  );
  const dealNameError = getFieldError(
    dealName,
    commentsSchema,
    errors?.fields?.dealName
  );
  const paymentDelayDaysError = getFieldError(
    paymentDelayDays,
    paymentDelayDaysSchema,
    errors?.fields?.paymentDelayDays
  );
  const revenueTypeIdError = getFieldError(
    revenueTypeId,
    revenueTypeIdSchema,
    errors?.fields?.revenueTypeId
  );

  useEffect(() => {
    onChange?.({
      socId,
      exerId,

      invoiceDate,
      dueDate: null,
      paymentDate: null,
      bankValueDate: salesValueDate ? salesValueDate : null,

      reference: reference ? reference : null,
      designation,

      amountHt,
      amountTax,
      amountTtc,

      comments: comments ? comments : null,
      opbOperationId: null,

      // sales (extension)
      dealNumber: dealNumber ? dealNumber : null,
      dealName: dealName ? dealName : null,
      revenueTypeId,
      paymentDelayDays,
    });
  }, [
    socId,
    exerId,
    invoiceDate,
    salesValueDate,
    reference,
    designation,
    amountHt,
    amountTax,
    amountTtc,
    comments,
    dealNumber,
    dealName,
    revenueTypeId,
    paymentDelayDays,
    onChange,
  ]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-10 gap-y-0 lg:grid-cols-2">
        <SalesSocieteField
          value={socId}
          onChange={setSocId}
          error={socIdError}
          options={options.societes}
        />

        <SalesExerciceField
          value={exerId}
          onChange={setExerId}
          error={exerIdError}
          options={options.exercices}
        />

        <SalesDateField
          value={invoiceDate}
          onChange={setInvoiceDate}
          error={invoiceDateError}
        />

        <SalesDateValueField
          value={salesValueDate}
          onChange={setSalesValueDate}
          error={salesValueDateError}
        />

        <SalesReferenceField
          value={reference}
          onChange={setReference}
          error={referenceError}
        />

        <SalesDesignationField
          value={designation}
          onChange={setDesignation}
          error={designationError}
        />

        <SalesAmountHtField
          value={amountHt}
          onChange={setAmountHt}
          error={amountHtError}
        />

        <SalesAmountTaxField
          value={amountTax}
          onChange={setAmountTax}
          error={amountTaxError}
        />

        <SalesAmountTtcField
          value={amountTtc}
          onChange={setAmountTtc}
          error={amountTtcError}
        />

        <SalesCommentsField
          value={comments}
          onChange={setComments}
          error={commentsError}
        />

        <SalesDealNameField
          value={dealName}
          onChange={setDealName}
          error={dealNameError}
        />

        <SalesDealNumberField
          value={dealNumber}
          onChange={setDealNumber}
          error={dealNumberError}
        />

        <SalesPaymentDelayDaysField
          value={paymentDelayDays}
          onChange={setPaymentDelayDays}
          error={paymentDelayDaysError}
        />

        <SalesRevenueTypeIdField
          value={revenueTypeId}
          onChange={setRevenueTypeId}
          error={revenueTypeIdError}
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