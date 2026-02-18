

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { InvoicePurchaseView, } from "@/domain/invoice/invoice-types";
import type { InvoiceFormErrors } from "@/ui/invoice/edit/InvoiceForm.props";
import type { SelectOption } from "@/ui/_shared/select-options";
import { InvoiceFormCard } from "@/ui/invoice/edit/InvoiceFormCard";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { saveInvoicePurchase } from "@/features/invoice/invoice-actions"; // ou ton action
import { InvoicePurchaseFormFields } from "./InvoicePurchaseFormFields";
import { InvoicePurchaseFormValues } from "./invoice-purchase-form.types";

export function InvoicePurchaseEditor(props: {
  initialInvoice: InvoicePurchaseView | null;
  options: {
	societes: SelectOption[];
	exercices: SelectOption[];
	centresCout: SelectOption[];
  };
}) {

	
  const { initialInvoice, options } = props;

  console.log("InvoicePurchaseEditor: list, sélection",options.societes, initialInvoice?.societeId  )

  const router = useRouter();

  const [formData, setFormData] = useState<InvoicePurchaseFormValues | null>(null);
  const [errors, setErrors] = useState<InvoiceFormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: InvoicePurchaseFormValues, invoiceId?: string) => {
	setSaving(true);
	setErrors({});

	try {
	  await saveInvoicePurchase(data, invoiceId);
	  router.push("/invoices/purchase");
	} catch (e) {
	  const message = e instanceof Error ? e.message : "Erreur lors de l’enregistrement";
	  setErrors({ global: [message], fields: {} });
	} finally {
	  setSaving(false);
	}
  };

  return (
	<>
	  <TransactionHeader
		title={initialInvoice ? "Modifier l'achat'" : "Nouvel achat"}
		subtitle="Saisie simplifiée"
	  />

	  <form
		onSubmit={(e) => {
		  e.preventDefault();
		  if (!formData) return;
		  handleSubmit(formData, initialInvoice?.id);
		}}
	  >
		<InvoiceFormCard saving={saving} onCancel={() => router.back()}>
		  <InvoicePurchaseFormFields
			initialInvoice={initialInvoice}
			errors={errors}
			options={options}
			onChange={setFormData}
		  />
		</InvoiceFormCard>
	  </form>
	</>
  );
}