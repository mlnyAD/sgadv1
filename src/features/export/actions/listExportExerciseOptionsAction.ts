

// src/features/export/actions/listExportExerciseOptionsAction.ts

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { listExportExerciseOptions } from "@/domain/export/export-exercice.repository";

export async function listExportExerciseOptionsAction() {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/export",
  });

  if (!current?.cltId) {
    throw new Error("Aucun client courant");
  }

  return listExportExerciseOptions({
    cltId: current.cltId,
  });
}