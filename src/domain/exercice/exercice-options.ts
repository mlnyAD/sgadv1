

// src/domain/exercice/exercice-options.ts

import { listExercices } from "@/domain/exercice/exercice-repository";

export async function getActiveExercicesOptions(cltId: string) {
  const { data } = await listExercices({
    cltId,
    page: 1,
    pageSize: 200,
    actif: true,
  });

  return data.map((e) => ({
    value: e.id,
    label: e.code,
  }));
}