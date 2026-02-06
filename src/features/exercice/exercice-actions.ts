

"use server";

import {
  createExercice,
  updateExercice,
} from "@/domain/exercice/exercice-repository";

import { mapExerciceFormToDb } from "@/domain/exercice/exercice-mapper";

import type { ExerciceFormValues } from "@/ui/exercice/exercice-form.types";

export async function saveExercice(
  data: ExerciceFormValues,
  exerciceId?: string
): Promise<void> {

  //console.log("🟡 [ACTION] saveExercice called", data);

  try {
    const payload = mapExerciceFormToDb(data);

    //console.log("🟡 [ACTION] payload", payload);

    if (exerciceId) {
      //console.log("🟡 [ACTION] updateExercice", centreCoutId);
      await updateExercice(exerciceId, payload);
    } else {
      //console.log("🟡 [ACTION] createExercice");
      await createExercice(payload);
    }

    //console.log("🟢 [ACTION] saveExercice success");

  } catch (error) {
    //console.error("🔴 [ACTION] saveExercice error", error);
    throw error;
  }
}
