

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { getAuthenticatedOperateur } from "@/lib/auth/get-authenticated-operateur";

import {
	createInvoiceSales,
	createInvoicePurchase,
	updateInvoiceSales,
	updateInvoicePurchase,
	deleteInvoicePurchase,
} from "@/domain/invoice/invoice-repository";

import {
	mapInvoiceSalesFormToInvoiceInsert,
	mapInvoiceSalesFormToInvoiceUpdate,
	mapInvoiceSalesFormToSalesInsert,
	mapInvoiceSalesFormToSalesUpdate,
	mapInvoicePurchaseFormToInvoiceInsert,
	mapInvoicePurchaseFormToInvoiceUpdate,
	mapInvoicePurchaseFormToPurchaseInsert,
	mapInvoicePurchaseFormToPurchaseUpdate,
} from "@/domain/invoice/invoice-mapper";

import type { InvoiceSalesFormValues } from "@/ui/invoice/edit/invoice-sales-form.types";
import type { InvoicePurchaseFormValues } from "@/ui/invoice/edit/invoice-purchase-form.types";

import { deleteInvoiceSales } from "@/domain/invoice/invoice-repository";

export async function saveInvoiceSales(data: InvoiceSalesFormValues, invId?: string): Promise<void> {
	const { current } = await getCurrentClient();
	if (!current?.cltId) throw new Error("Aucun client sélectionné");

	const operateur = await getAuthenticatedOperateur();
	if (!operateur?.operId) throw new Error("Aucun opérateur authentifié");

	if (invId) {
		const invoice = mapInvoiceSalesFormToInvoiceUpdate(data);
		invoice.oper_id = operateur.operId;

		await updateInvoiceSales(invId, {
			invoice,
			sales: mapInvoiceSalesFormToSalesUpdate(data),
		});
		return;
	}

	const invoiceBase = mapInvoiceSalesFormToInvoiceInsert(data);

	await createInvoiceSales({
		invoice: { ...invoiceBase, oper_id: operateur.operId },
		sales: mapInvoiceSalesFormToSalesInsert(data),
	});
}

export async function saveInvoicePurchase(data: InvoicePurchaseFormValues, invId?: string): Promise<void> {
	const { current } = await getCurrentClient();
	if (!current?.cltId) throw new Error("Aucun client sélectionné");

	const operateur = await getAuthenticatedOperateur();
	if (!operateur?.operId) throw new Error("Aucun opérateur authentifié");

	if (invId) {
		const invoice = mapInvoicePurchaseFormToInvoiceUpdate(data);
		invoice.oper_id = operateur.operId;

		await updateInvoicePurchase(invId, {
			invoice,
			purchase: mapInvoicePurchaseFormToPurchaseUpdate(data),
		});
		return;
	}


	const invoiceBase = mapInvoicePurchaseFormToInvoiceInsert(data);

	await createInvoicePurchase({
		invoice: { ...invoiceBase, oper_id: operateur.operId },
		purchase: mapInvoicePurchaseFormToPurchaseInsert(data),
	});

}

export async function deleteInvoiceSalesAction(invId: string) {
  await deleteInvoiceSales({ invId });
}

export async function deleteInvoicePurchaseAction(invId: string) {
  await deleteInvoicePurchase({ invId });
}