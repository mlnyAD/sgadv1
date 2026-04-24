

"use server";

import { listRapportExerciseOptions } from "@/domain/rapport/services/listRapportExerciseOptions";

export async function listRapportExerciseOptionsAction(cltId: string) {
  return listRapportExerciseOptions({ cltId });
}