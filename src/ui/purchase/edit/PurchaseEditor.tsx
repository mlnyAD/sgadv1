

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { PurchaseView } from "@/domain/purchase/purchase-types";
import type { PurchaseFormErrors } from "@/ui/purchase/edit/PurchaseForm.props";
import type { SelectOption } from "@/ui/_shared/select-options";
import { PurchaseFormCard } from "@/ui/purchase/edit/PurchaseFormCard";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { PurchaseFormFields } from "@/ui/purchase/edit/PurchaseFormFields";
import type { PurchaseFormValues } from "@/ui/purchase/edit/purchase-form.types";
import { savePurchase } from "@/features/purchase/purchase-actions"; // ou ton action

export function PurchaseEditor(props: {
  initialPurchase: PurchaseView | null;
  options: {
    societes: SelectOption[];
    exercices: SelectOption[];
    centresCout: SelectOption[];
  };
}) {

    
  const { initialPurchase, options } = props;

  //console.log("PurchaseEditor: list, sélection",options.societes, initialPurchase?.societeId  )

  const router = useRouter();

  const [formData, setFormData] = useState<PurchaseFormValues | null>(null);
  const [errors, setErrors] = useState<PurchaseFormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: PurchaseFormValues, purchaseId?: string) => {
    setSaving(true);
    setErrors({});

    try {
      await savePurchase(data, purchaseId);
      router.push("/purchases");
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
        title={initialPurchase ? "Modifier l'achat'" : "Nouvel achat"}
        subtitle="Saisie d'une facture d'achat"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!formData) return;
          handleSubmit(formData, initialPurchase?.id);
        }}
      >
        <PurchaseFormCard saving={saving} onCancel={() => router.back()}>
          <PurchaseFormFields
            initialPurchase={initialPurchase}
            errors={errors}
            options={options}
            onChange={setFormData}
          />
        </PurchaseFormCard>
      </form>
    </>
  );
}