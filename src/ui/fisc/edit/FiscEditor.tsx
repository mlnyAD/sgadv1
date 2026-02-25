

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { FiscView } from "@/domain/fisc/fisc-types";
import type { FiscFormValues } from "@/ui/fisc/fisc-form.types";
import type { FiscFormErrors } from "@/ui/fisc/edit/FiscForm.props";

import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { FiscFormCard } from "@/ui/fisc/edit/FiscFormCard";
import { FiscFormFields } from "@/ui/fisc/edit/FiscFormFields";
import { saveFisc } from "@/features/fisc/fisc-actions";
import { deleteFiscAction } from "@/features/fisc/fisc-actions";


export function FiscEditor(props: { initialFisc: FiscView | null; exercicesOptions: { value: string; label: string }[]; }) {
  const { initialFisc, exercicesOptions } = props;
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState<FiscFormValues | null>(null);
  const [errors, setErrors] = useState<FiscFormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: FiscFormValues, fiscId?: string) => {
    setSaving(true);
    setErrors({});

    try {
      await saveFisc(data, fiscId);
      router.push("/fisc");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur lors de l’enregistrement";
      setErrors({ global: [message], fields: {} });
    } finally {
      setSaving(false);
    }
  };

   async function handleDelete() {
    if (!initialFisc?.id) return;

    const ok = window.confirm("Supprimer ce versement fiscal ?");
    if (!ok) return;

    setDeleting(true);
    setErrors({});

    try {
      await deleteFiscAction(initialFisc.id);
      router.push("/fisc");
      router.refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur lors de la suppression";
      setErrors({ global: [message], fields: {} });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <TransactionHeader
        title={initialFisc ? "Modifier le versement" : "Nouveau versement"}
        subtitle={
          initialFisc
            ? "Modification d’un versement fiscal"
            : "Création d’un versement fiscal"
        }
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!formData) return;
          handleSubmit(formData, initialFisc?.id);
        }}
      >
		 {/* ...header + form... */}
<FiscFormCard
        errors={errors}
        saving={saving}
        onCancel={() => router.back()}
        canDelete={!!initialFisc?.id}
        deleting={deleting}
        onDelete={handleDelete}
      >
        <FiscFormFields
          initialFisc={initialFisc}
          errors={errors}
          onChange={setFormData}
          exercicesOptions={exercicesOptions}
        />
      </FiscFormCard>
	        </form>
    </>
  );
}