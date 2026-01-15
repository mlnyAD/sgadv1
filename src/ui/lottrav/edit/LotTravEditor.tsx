

"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LotTravView } from "@/domain/lottrav/lottrav-view";
import { saveLotTrav } from "@/features/lottrav/lottrav-actions";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { LotTravFormCard } from "@/ui/lottrav/edit/LotTravFormCard";
import { LotTravFormFields } from "@/ui/lottrav/edit/LotTravFormFields";
import type { LotTravFormErrors } from "@/ui/lottrav/edit/LotTravForm.props";
import type { LotTravFormValues, OperatorOption } from "@/ui/lottrav/lottrav-form.types";


/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function LotTravEditor({
  projectId,
  initialLot,
  operators,
}: {
  projectId: number;
  initialLot: LotTravView | null;
  operators: OperatorOption[];
}) {
  const router = useRouter();

  const [formData, setFormData] = useState<LotTravFormValues  | null>(null);
  const [errors, setErrors] = useState<LotTravFormErrors>({});
  const [saving, setSaving] = useState(false);

  /* ------------------------------
     Form change handler
     ------------------------------ */

  const handleChange = useCallback((data: LotTravFormValues) => {
    setFormData(data);

    const nextErrors: LotTravFormErrors = {};

    if (data.startDate && data.endDate && data.startDate > data.endDate) {
      nextErrors.fields = {
        endDate:
          "La date de fin doit être postérieure à la date de début",
      };
    }

    setErrors((prev) =>
      JSON.stringify(prev) === JSON.stringify(nextErrors)
        ? prev
        : nextErrors
    );
  }, []);

  /* ------------------------------
     Submit
     ------------------------------ */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData || saving) return;

    if (errors.fields && Object.keys(errors.fields).length > 0) {
      return;
    }

    try {
      setSaving(true);

      await saveLotTrav(
        projectId,
        formData,
        initialLot?.id
      );

      toast.success("Lot de travaux enregistré avec succès");
      router.push(`/projects/${projectId}/lots`);
    } catch {
      toast.error("Erreur lors de l'enregistrement du lot");

      setErrors({
        global: ["Erreur lors de l'enregistrement du lot"],
      });
    } finally {
      setSaving(false);
    }
  };

  /* ------------------------------
     Cancel
     ------------------------------ */

  const handleCancel = () => {
    router.push(`/projects/${projectId}/lots`);
  };

  /* ------------------------------
     Render
     ------------------------------ */

  return (
    <>
      <TransactionHeader
        title={
          initialLot
            ? "Modifier le lot de travaux"
            : "Nouveau lot de travaux"
        }
        subtitle={
          initialLot
            ? "Modification des informations du lot de travaux"
            : "Création d’un nouveau lot de travaux"
        }
      />

      <form onSubmit={handleSubmit}>
        <LotTravFormCard
          onCancel={handleCancel}
          saving={saving}
        >
          <LotTravFormFields
            initialLot={initialLot}
            operators={operators}
            errors={errors}
            onChange={handleChange}
          />
        </LotTravFormCard>
      </form>
    </>
  );
}
