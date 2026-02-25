

// src/features/fisc/fisc-actions.ts

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { createFisc, updateFisc } from "@/domain/fisc/fisc-repository";
import { mapFiscFormToInsert, mapFiscFormToUpdate } from "@/domain/fisc/fisc-mapper";
import type { FiscFormValues } from "@/ui/fisc/fisc-form.types";

import { revalidatePath } from "next/cache";
import { deleteFisc } from "@/domain/fisc/fisc-repository";

export async function saveFisc(data: FiscFormValues, fiscId?: string): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  if (fiscId) {
    await updateFisc(fiscId, mapFiscFormToUpdate(data));
    return;
  }

  await createFisc(mapFiscFormToInsert(data));
}

export async function deleteFiscAction(fiscId: string): Promise<void> {
  await deleteFisc(fiscId);
  revalidatePath("/fisc");
}