

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { InvoiceSalesView } from "@/domain/invoice/invoice-types";
import type { InvoiceFormErrors } from "@/ui/invoice/edit/InvoiceForm.props";
import type { SelectOption } from "@/ui/_shared/select-options";
import { InvoiceFormCard } from "@/ui/invoice/edit/InvoiceFormCard";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { InvoiceSalesFormFields } from "@/ui/invoice/edit/InvoiceSalesFormFields";
import type { InvoiceSalesFormValues } from "@/ui/invoice/edit/invoice-sales-form.types";
import { saveInvoiceSales } from "@/features/invoice/invoice-actions"; // ou ton action

export function InvoiceSalesEditor(props: {
  initialInvoice: InvoiceSalesView | null;
  options: {
    societes: SelectOption[];
    exercices: SelectOption[];
    centresCout: SelectOption[];
  };
}) {

    
  const { initialInvoice, options } = props;

  console.log("InvoiceSalesEditor: list, sélection",options.societes, initialInvoice?.societeId  )

  const router = useRouter();

  const [formData, setFormData] = useState<InvoiceSalesFormValues | null>(null);
  const [errors, setErrors] = useState<InvoiceFormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: InvoiceSalesFormValues, invoiceId?: string) => {
    setSaving(true);
    setErrors({});

    try {
      await saveInvoiceSales(data, invoiceId);
      router.push("/invoices/sales");
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
        title={initialInvoice ? "Modifier la vente" : "Nouvelle vente"}
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
          <InvoiceSalesFormFields
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