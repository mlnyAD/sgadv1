

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { SalesView } from "@/domain/sales/sales-types";
import type { SalesFormErrors } from "@/ui/sales/edit/SalesForm.props";
import type { SelectOption } from "@/ui/_shared/select-options";
import { SalesFormCard } from "@/ui/sales/edit/SalesFormCard";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { SalesFormFields } from "@/ui/sales/edit/SalesFormFields";
import type { SalesFormValues } from "@/ui/sales/edit/sales-form.types";
import { saveSales } from "@/features/sales/sales-actions"; // ou ton action

export function SalesEditor(props: {
  initialSales: SalesView | null;
  options: {
    societes: SelectOption[];
    exercices: SelectOption[];
  };
}) {

    
  const { initialSales, options } = props;

  //console.log("SalesEditor: list, sélection",options.societes, initialInvoice?.societeId  )

  const router = useRouter();

  const [formData, setFormData] = useState<SalesFormValues | null>(null);
  const [errors, setErrors] = useState<SalesFormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: SalesFormValues, salesId?: string) => {
    setSaving(true);
    setErrors({});

    try {
      await saveSales(data, salesId);
      router.push("/sales");
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
        title={initialSales ? "Modifier la vente" : "Nouvelle vente"}
        subtitle="Saisie d'une facture de vente"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!formData) return;
          handleSubmit(formData, initialSales?.id);
        }}
      >
        <SalesFormCard saving={saving} onCancel={() => router.back()}>
          <SalesFormFields
            initialSales={initialSales}
            errors={errors}
            options={options}
            onChange={setFormData}
          />
        </SalesFormCard>
      </form>
    </>
  );
}