

"use server";

import {
  createSociete,
  updateSociete,
} from "@/domain/societe/societe-repository";

import { mapSocieteFormToDb } from "@/domain/societe/societe-mapper";

import type { SocieteFormValues } from "@/ui/societe/societe-form.types";

export async function saveSociete(
  data: SocieteFormValues,
  societeId?: string
): Promise<void> {

  //console.log("🟡 [ACTION] saveSociete called", data);

  try {
    const payload = mapSocieteFormToDb(data);

    //console.log("🟡 [ACTION] payload", payload);

    if (societeId) {
      //console.log("🟡 [ACTION] updateSociete", centreCoutId);
      await updateSociete(societeId, payload);
    } else {
      //console.log("🟡 [ACTION] createSociete");
      await createSociete(payload);
    }

    //console.log("🟢 [ACTION] saveSociete success");

  } catch (error) {
    console.error("🔴 [ACTION] saveSociete error", error);
    throw error;
  }
}
