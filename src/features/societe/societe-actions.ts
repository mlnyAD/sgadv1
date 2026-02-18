

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { createSociete, updateSociete } from "@/domain/societe/societe-repository";
import { mapSocieteFormToInsert, mapSocieteFormToUpdate } from "@/domain/societe/societe-mapper";
import type { SocieteFormValues } from "@/ui/societe/societe-form.types";

export async function saveSociete(data: SocieteFormValues, societeId?: string): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  if (societeId) {
    await updateSociete(societeId, mapSocieteFormToUpdate(data));
    return;
  }

  await createSociete(mapSocieteFormToInsert(data));
}