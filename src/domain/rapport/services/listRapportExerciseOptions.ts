

// src/domain/rapport/services/listRapportExerciseOptions.ts

"use server";

import { listBudgetExerciseOptions } from "@/domain/budget/budget-repository";

export type RapportExerciseOption = {
  exerId: string;
  exerCode: string;
};

export async function listRapportExerciseOptions(params: {
  cltId: string;
}): Promise<RapportExerciseOption[]> {
  const rows = await listBudgetExerciseOptions({
    cltId: params.cltId,
    actifOnly: false,
  });

  return rows.map((row) => ({
    exerId: row.exer_id,
    exerCode: row.exer_code ?? "",
  }));
}