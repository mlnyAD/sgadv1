

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ExerciceView } from "@/domain/exercice/exercice-types";
import { saveExercice } from "@/features/exercice/exercice-actions";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { ExerciceFormCard } from "@/ui/exercice/edit/ExerciceFormCard";
import { ExerciceFormFields } from "@/ui/exercice/edit/ExerciceFormFields";
import type { ExerciceFormValues } from "@/ui/exercice/exercice-form.types";
import type { ExerciceFormErrors } from "@/ui/exercice/edit/ExerciceForm.props";


export function ExerciceEditor({
	initialExercice,
}: {
	initialExercice: ExerciceView | null;
}) {
	const router = useRouter();

const [formData, setFormData] = useState<ExerciceFormValues | null>(null);
const [errors, setErrors] = useState<ExerciceFormErrors>({});
const [saving, setSaving] = useState(false);

const handleSubmit = async (
  data: ExerciceFormValues,
  exerciceId?: string
) => {
  setSaving(true);
  setErrors({});

  try {
    await saveExercice(data, exerciceId);
    router.push("/exercices");
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Erreur lors de l’enregistrement";

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
				title={
					initialExercice ? "Modifier l'exercice" : "Nouvel exercice"
				}
				subtitle={
					initialExercice
						? "Modification des informations de l'exercice"
						: "Création d’un nouvel exercice"
				}
			/>
<form
  onSubmit={(e) => {
    e.preventDefault();
    if (!formData) return;
    handleSubmit(formData, initialExercice?.id);
  }}
>
  <ExerciceFormCard
    initialExercice={initialExercice}
    errors={errors}
    saving={saving}
    onCancel={() => router.back()}
  >
    <ExerciceFormFields
      initialExercice={initialExercice}
      errors={errors}
      onChange={setFormData}
    />
  </ExerciceFormCard>
</form>
		</>
	);
}
