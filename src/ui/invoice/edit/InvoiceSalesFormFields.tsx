

"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { InvoiceSalesView } from "@/domain/invoice/invoice-types";
import type { InvoiceFormErrors } from "./InvoiceForm.props";
import type { InvoiceSalesFormValues } from "./invoice-sales-form.types";
import { toDateInputValue } from "@/helpers/date";

// fields (communs)
import { InvoiceSocieteField } from "@/ui/invoice/fields/InvoiceSocieteField";
import { InvoiceExerciceField } from "@/ui/invoice/fields/InvoiceExerciceField";
import { InvoiceCentreCoutField } from "@/ui/invoice/fields/InvoiceCentreCoutField";
import { InvoiceInvoiceDateField } from "@/ui/invoice/fields/InvoiceInvoiceDateField";
import { InvoiceReferenceField } from "@/ui/invoice/fields/InvopiceReferenceField";
import { InvoiceDesignationField } from "@/ui/invoice/fields/InvoiceDesignationField";
import { InvoiceAmountHtField } from "@/ui/invoice/fields/InvoiceAmountHtField";
import { InvoiceAmountTaxField } from "@/ui/invoice/fields/InvoiceAmountTaxField";
import { InvoiceAmountTtcField } from "@/ui/invoice/fields/InvoiceAmountTtcField";
import { InvoiceCommentsField } from "@/ui/invoice/fields/InvoiceCommentsFields";
import { SelectOption } from "@/components/fields/types";
import { InvoiceDealNameField } from "../fields/sales/InvoiceDealNameField";
import { InvoiceDealNumberField } from "../fields/sales/InvoiceDealNumberField";
import { InvoiceRevenueTypeIdField } from "../fields/sales/InvoiceRevenueTypeIdField";
import { InvoicePaymentDelayDaysField } from "../fields/sales/InvoicePaymentDelayDaysFields";
import { toRevenueTypeId, type RevenueTypeId } from "@/domain/invoice/invoice-types.catalog";

/* ------------------------------------------------------------------ */
/* Validation schemas (1 par champ)                                    */
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
/* Utils                                                               */
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

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
interface Props {
	initialInvoice: InvoiceSalesView | null;
	errors: InvoiceFormErrors;
	options: {
		societes: SelectOption[];
		exercices: SelectOption[];
		centresCout: SelectOption[];
	};
	onChange?: (data: InvoiceSalesFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function InvoiceSalesFormFields({
	initialInvoice,
	errors,
	onChange,
	options,
}: Props) {

	console.log("edit sales: list, sélection", options.societes, initialInvoice?.societeId)

	// commun
	const [socId, setSocId] = useState(initialInvoice?.societeId ?? "");
	const [exerId, setExerId] = useState(initialInvoice?.exerciceId ?? "");
	const [ccId, setCcId] = useState(initialInvoice?.centreCoutId ?? "");

	const [invoiceDate, setInvoiceDate] = useState<string>(
		toDateInputValue(initialInvoice?.dateFacture)
	);

	const [reference, setReference] = useState(initialInvoice?.reference ?? "");
	const [designation, setDesignation] = useState(initialInvoice?.designation ?? "");

	const [amountHt, setAmountHt] = useState<number>(initialInvoice?.montantHt ?? 0);
	const [amountTax, setAmountTax] = useState<number>(initialInvoice?.montantTax ?? 0);
	const [amountTtc, setAmountTtc] = useState<number>(initialInvoice?.montantTtc ?? 0);

	const [comments, setComments] = useState(initialInvoice?.commentaires ?? "");

	const [dealName, setDealName] = useState(initialInvoice?.dealName ?? "");
	const [dealNumber, setDealNumber] = useState(initialInvoice?.dealNumber ?? "");
	const [paymentDelayDays, setPaymentDelayDays] = useState(initialInvoice?.paymentDelayDays ?? 60);
	const [revenueTypeId, setRevenueTypeId] = useState<RevenueTypeId>(
		initialInvoice?.revenueTypeId == null ? 1 : toRevenueTypeId(initialInvoice.revenueTypeId)
	);

	// errors
	const socIdError = getFieldError(socId, idSchema, errors?.fields?.socId);
	const exerIdError = getFieldError(exerId, idSchema, errors?.fields?.exerId);
	const ccIdError = getFieldError(ccId, idSchema, errors?.fields?.ccId);

	const invoiceDateError = getFieldError(
		invoiceDate,
		dateSchema,
		errors?.fields?.invoiceDate
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

	const dealNumberError = getFieldError(dealNumber, commentsSchema, errors?.fields?.dealNumber);
	const dealNameError = getFieldError(dealName, commentsSchema, errors?.fields?.dealName);
	const paymentDelayDaysError = getFieldError(paymentDelayDays, paymentDelayDaysSchema, errors?.fields?.paymentDelayDays);
	const revenueTypeIdError = getFieldError(revenueTypeId, revenueTypeIdSchema, errors?.fields?.revenueTypeId);

	useEffect(() => {
		onChange?.({
			socId,
			exerId,
			ccId,
			invType: 1,

			invoiceDate,
			dueDate: null,
			paymentDate: null,
			bankValueDate: null,

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
		ccId,
		invoiceDate,
		reference,
		designation,
		amountHt,
		amountTax,
		amountTtc,
		comments,

		// compléments
		dealNumber,
		dealName,
		revenueTypeId,
		paymentDelayDays,

		onChange,
	]);

	console.log("edit sales: list, sélection", options.societes, socId)

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-0">
				<InvoiceSocieteField value={socId} onChange={setSocId} error={socIdError} options={options.societes} />
				<InvoiceExerciceField value={exerId} onChange={setExerId} error={exerIdError} options={options.exercices} />
				<InvoiceCentreCoutField value={ccId} onChange={setCcId} error={ccIdError} options={options.centresCout} />

				<InvoiceInvoiceDateField
					value={invoiceDate}
					onChange={setInvoiceDate}
					error={invoiceDateError}
				/>

				<InvoiceReferenceField
					value={reference}
					onChange={setReference}
					error={referenceError}
				/>

				<InvoiceDesignationField
					value={designation}
					onChange={setDesignation}
					error={designationError}
				/>

				<InvoiceAmountHtField value={amountHt} onChange={setAmountHt} error={amountHtError} />
				<InvoiceAmountTaxField value={amountTax} onChange={setAmountTax} error={amountTaxError} />
				<InvoiceAmountTtcField value={amountTtc} onChange={setAmountTtc} error={amountTtcError} />

				<InvoiceCommentsField
					value={comments}
					onChange={setComments}
					error={commentsError}
				/>

				<InvoiceDealNameField
					value={dealName}
					onChange={setDealName}
					error={dealNameError}
				/>

				<InvoiceDealNumberField
					value={dealNumber}
					onChange={setDealNumber}
					error={dealNumberError}
				/>

				<InvoicePaymentDelayDaysField
					value={paymentDelayDays}
					onChange={setPaymentDelayDays}
					error={paymentDelayDaysError}
				/>

<InvoiceRevenueTypeIdField
  value={revenueTypeId}
  onChange={(v) => setRevenueTypeId(v ?? 1)}
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