

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { CompteView } from "@/domain/compte/compte-types";
import type { CompteFormValues } from "@/ui/compte/compte-form.types";
import type { CompteFormErrors } from "@/ui/compte/edit/CompteForm.props";

import { saveCompte } from "@/features/comptes/compte-actions";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { CompteFormCard } from "@/ui/compte/edit/CompteFormCard";
import { CompteFormFields } from "@/ui/compte/edit/CompteFormFields";

export function CompteEditor({ initialCompte }: { initialCompte: CompteView | null }) {
  const router = useRouter();

  const [formData, setFormData] = useState<CompteFormValues | null>(null);
  const [errors, setErrors] = useState<CompteFormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: CompteFormValues, compteId?: string) => {
    setSaving(true);
    setErrors({});

    try {
      await saveCompte(data, compteId);
      router.push("/comptes");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur lors de l’enregistrement";

      setErrors({
        global: [message],
        fields: {},
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <TransactionHeader
        title={initialCompte ? "Modifier le compte" : "Nouveau compte"}
        subtitle={
          initialCompte
            ? "Modification des informations du compte"
            : "Création d’un nouveau compte"
        }
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!formData) return;
          handleSubmit(formData, initialCompte?.id);
        }}
      >
        <CompteFormCard
          initialCompte={initialCompte}
          errors={errors}
          saving={saving}
          onCancel={() => router.back()}
        >
          <CompteFormFields initialCompte={initialCompte} errors={errors} onChange={setFormData} />
        </CompteFormCard>
      </form>
    </>
  );
}