

"use client";

import { Button } from "@/components/ui/button";
import { ExerciceView } from "@/domain/exercice/exercice-types";
import { ExerciceFormErrors } from "./ExerciceForm.props";

export interface ExerciceFormCardProps {
	initialExercice?: ExerciceView | null;
	errors?: ExerciceFormErrors;

	onCancel?: () => void;
	saving?: boolean;
	children?: React.ReactNode;
}

export function ExerciceFormCard({
  onCancel,
  saving = false,
  children,
}: ExerciceFormCardProps) {
  return (
    <div className="w-full max-w-3xl rounded-lg border bg-card p-6 space-y-6">

      <div className="space-y-4">
        {children}
      </div>

      <div className="flex justify-end gap-2 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
        >
          Annuler
        </Button>

        <Button
          type="submit"
          variant="axcio"
          disabled={saving}
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </div>
  );
}