

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { createCentreCout, updateCentreCout } from "@/domain/centre-cout/centre-cout-repository";
import { mapCentreCoutFormToInsert, mapCentreCoutFormToUpdate } from "@/domain/centre-cout/centre-cout-mapper";
import type { CentreCoutFormValues } from "@/ui/centre-cout/centre-cout-form.types";


export async function saveCentreCout(
	data: CentreCoutFormValues,
	centreCoutId?: string
): Promise<void> {

const { current } = await getCurrentClient();
  if (!current) throw new Error("Aucun client sélectionné");

  const cltId = current.cltId;
  if (!cltId) throw new Error("Client courant invalide");	

	if (centreCoutId) {
		await updateCentreCout({
			cltId,
			centreCoutId,
			payload: mapCentreCoutFormToUpdate(data),
		});
		return;
	}

	await createCentreCout({
		cltId,
		payload: mapCentreCoutFormToInsert(data),
	});
}