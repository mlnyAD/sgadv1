

import type { ExerciceView } from "@/domain/exercice/exercice-types";
import type { ExerciceFormValues } from "@/ui/exercice/exercice-form.types";


export interface ExerciceFormProps {
    initialLot: ExerciceView | null;

    errors: ExerciceFormErrors;

    onChange?: (data: ExerciceFormValues) => void;

}

/* ------------------------------------------------------------------ */
/* Exercice form errors                                                  */
/* ------------------------------------------------------------------ */

export interface ExerciceFormErrors {
  global?: string[];
  fields?: {
    code?: string;
    debut?: string;
    fin?: string;
    actif?: string;
    commentaires?: string;
  };
}
