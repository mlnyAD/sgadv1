

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { createCentreCout, updateCentreCout } from "@/domain/centre-cout/centre-cout-repository";
import { mapCentreCoutFormToInsert, mapCentreCoutFormToUpdate } from "@/domain/centre-cout/centre-cout-mapper";
import type { CentreCoutFormValues } from "@/ui/centre-cout/centre-cout-form.types";

export async function saveCentreCout(data: CentreCoutFormValues, centreCoutId?: string): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  if (centreCoutId) {
    await updateCentreCout(centreCoutId, mapCentreCoutFormToUpdate(data));
    return;
  }

  await createCentreCout(mapCentreCoutFormToInsert(data));
}