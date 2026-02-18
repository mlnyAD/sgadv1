


"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { InvoicePurchaseView } from "@/domain/invoice/invoice-types";
import type { InvoiceFormErrors } from "./InvoiceForm.props";
import type { InvoicePurchaseFormValues } from "./invoice-purchase-form.types";
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
import { InvoicePaidByCltAmountField } from "../fields/purchase/InvoicePaidByCltAmountField";
import { InvoicePaidByThirdPartyAmountField } from "../fields/purchase/InvoicePaidByThirdPartyAmountField";

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

type Option = { value: string; label: string };

interface Props {
	initialInvoice: InvoicePurchaseView | null;
	errors: InvoiceFormErrors;
	onChange?: (data: InvoicePurchaseFormValues) => void;

	options: {
		societes: Option[];
		exercices: Option[];
		centresCout: Option[];
	};
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function InvoicePurchaseFormFields({
	initialInvoice,
	errors,
	onChange,
	options,
}: Props) {
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

	const [paidByCltAmount, setPaidByCltAmount] =
		useState(initialInvoice?.paidByCltAmount ?? 0);
	const [paidByThirdPartyAmount, setPaidByThirdPartyAmount] =
		useState(initialInvoice?.paidByThirdPartyAmount ?? 0);

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

	const paidByCltAmountError = getFieldError(paidByCltAmount, moneySchema, errors?.fields?.paidByCltAmount);
	const paidByThirdPartyAmountError = getFieldError(paidByThirdPartyAmount, moneySchema, errors?.fields?.paidByThirdPartyAmount);


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

			// purchase (extension)
			paidByCltAmount,
			paidByThirdPartyAmount,
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
		paidByCltAmount,
		paidByThirdPartyAmount,
		onChange,
	]);

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-0">

				<InvoiceSocieteField
					value={socId}
					onChange={setSocId}
					error={socIdError}
					options={options.societes}
				/>

				<InvoiceExerciceField
					value={exerId}
					onChange={setExerId}
					error={exerIdError}
					options={options.exercices}
				/>

				<InvoiceCentreCoutField
					value={ccId}
					onChange={setCcId}
					error={ccIdError}
					options={options.centresCout}
				/>

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

				<InvoicePaidByCltAmountField
					value={paidByCltAmount}
					onChange={setPaidByCltAmount}
					error={paidByCltAmountError}
				/>
				<InvoicePaidByThirdPartyAmountField
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