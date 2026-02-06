

// src/ui/operateur/edit/OperateurEditor.tsx
"use client";

import { useState } from "react";

import type { OperateurView, OperateurSaveResult } from "@/domain/operateur/operateur-types";
import { saveOperateur } from "@/features/operateur/operateur-action";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { OperateurFormCard } from "@/ui/operateur/edit/OperateurFormCard";
import { OperateurFormFields } from "@/ui/operateur/edit/OperateurFormFields";
import type { OperateurFormValues } from "@/ui/operateur/operateur-form.types";
import type { OperateurFormErrors } from "@/ui/operateur/edit/OperateurForm.props";
import { mapFormToOperateurView } from "@/domain/operateur/operateur.mapper";

export function OperateurEditor({
  initialOperateur,
  onCancel,
  onSaved,
}: {
  initialOperateur: OperateurView | null;
  onCancel?: () => void;
  onSaved?: (result: OperateurSaveResult) => void;
}) {
  const [formData, setFormData] = useState<OperateurFormValues | null>(null);
  const [errors, setErrors] = useState<OperateurFormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: OperateurFormValues, operateurId?: string) => {
    setSaving(true);
    setErrors({});

    const operateurView = mapFormToOperateurView(data, operateurId);

    try {
      const result = await saveOperateur(operateurView);
      onSaved?.(result);
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
        title={initialOperateur ? "Modifier l’opérateur" : "Nouvel opérateur"}
        subtitle={
          initialOperateur
            ? "Modification des informations de l’opérateur"
            : "Création d’un nouvel opérateur"
        }
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!formData) return;
          handleSubmit(formData, initialOperateur?.id);
        }}
      >
        <OperateurFormCard
          initialOperateur={initialOperateur}
          errors={errors}
          saving={saving}
          onCancel={onCancel}
        >
          <OperateurFormFields
            initialOperateur={initialOperateur}
            errors={errors}
            onChange={setFormData}
          />
        </OperateurFormCard>
      </form>
    </>
  );
}