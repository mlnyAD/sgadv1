

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { createExercice, updateExercice } from "@/domain/exercice/exercice-repository";
import { mapExerciceFormToInsert, mapExerciceFormToUpdate } from "@/domain/exercice/exercice-mapper";
import type { ExerciceFormValues } from "@/ui/exercice/exercice-form.types";

export async function saveExercice(data: ExerciceFormValues, exerciceId?: string): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  if (exerciceId) {
    await updateExercice(exerciceId, mapExerciceFormToUpdate(data));
    return;
  }

  await createExercice(mapExerciceFormToInsert(data));
}