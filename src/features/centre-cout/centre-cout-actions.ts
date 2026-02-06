

"use server";

import {
  createCentreCout,
  updateCentreCout,
} from "@/domain/centre-cout/centre-cout-repository";

import { mapCentreCoutFormToDb } from "@/domain/centre-cout/centre-cout-mapper";

import type { CentreCoutFormValues } from "@/ui/centre-cout/centre-cout-form.types";

export async function saveCentreCout(
  data: CentreCoutFormValues,
  centreCoutId?: string
): Promise<void> {

  //console.log("🟡 [ACTION] saveCentreCout called", data);

  try {
    const payload = mapCentreCoutFormToDb(data);

    //console.log("🟡 [ACTION] payload", payload);

    if (centreCoutId) {
      //console.log("🟡 [ACTION] updateCentreCout", centreCoutId);
      await updateCentreCout(centreCoutId, payload);
    } else {
      //console.log("🟡 [ACTION] createCentreCout");
      await createCentreCout(payload);
    }

    //console.log("🟢 [ACTION] saveCentreCout success");

  } catch (error) {
    //console.error("🔴 [ACTION] saveCentreCout error", error);
    throw error;
  }
}
