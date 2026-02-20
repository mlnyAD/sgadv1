

// src/features/budget/getbudgeteditordata.ts
"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { listBudgetExerciseOptions, listBudgetLines } from "@/domain/budget/budget-repository";
import { listCentresCout } from "@/domain/centre-cout/centre-cout-repository";

import { buildBudgetSkeleton, mergeExistingIntoSkeleton } from "./budget-skeleton";
import type { BudgetDraftRow } from "./budget.types";

export type BudgetEditorData = {
  cltId: string;
  exerid: string;
  exerciseOptions: { exer_id: string; exer_code: string | null; exer_actif?: boolean | null }[];
  rows: BudgetDraftRow[];
};

export async function getBudgetEditorData(params: { exerid?: string }): Promise<BudgetEditorData> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  // ⚠️ Tu sélectionnes exer_actif dans listBudgetExerciseOptions : assure-toi que la colonne existe.
  // Sinon: retire exer_actif de la requête.
  const exerciseOptions = await listBudgetExerciseOptions({ cltId: current.cltId, actifOnly: true });

  const defaultExerid = exerciseOptions[0]?.exer_id;
  const exerid = params.exerid ?? defaultExerid;
  if (!exerid) throw new Error("Aucun exercice disponible");

  const centresCout = await listCentresCout({ cltId: current.cltId, actifOnly: true });
  const existing = await listBudgetLines({ cltId: current.cltId, exerid }); // peut être vide

  const skeleton = buildBudgetSkeleton({ exerid, centresCout });
  const rows = mergeExistingIntoSkeleton({ skeleton, existing });

  return { cltId: current.cltId, exerid, exerciseOptions, rows };
}