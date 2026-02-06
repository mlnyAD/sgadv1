

import type { ExerciceFormValues } from "@/ui/exercice/exercice-form.types";
import type { ExerciceView } from "@/domain/exercice/exercice-types";
import { dateInputToUtcDate } from "@/helpers/date";

/**
 * Mapping Form → ExerciceView
 * - Le form fournit toujours des strings
 * - Le modèle UI accepte null/optionnel
 */
export function mapExerciceFormToView(
  form: ExerciceFormValues
): ExerciceView {
  return {
    // id absent à la création, fourni séparément à l’update
    id: "",

    code: form.code,
    cltId: form.cltId,

    debut: dateInputToUtcDate(form.debut),
    fin: dateInputToUtcDate(form.fin),

    actif: form.actif,
    commentaires: form.commentaires,
  };
}
