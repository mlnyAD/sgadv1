

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { createCompte, updateCompte } from "@/domain/compte/compte-repository";
import { mapCompteFormToInsert, mapCompteFormToUpdate } from "@/domain/compte/compte-mapper";
import type { CompteFormValues } from "@/ui/compte/compte-form.types";

export async function saveCompte(data: CompteFormValues, compteId?: string): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  if (compteId) {
    await updateCompte(compteId, mapCompteFormToUpdate(data));
    return;
  }

  await createCompte(mapCompteFormToInsert(data));
}