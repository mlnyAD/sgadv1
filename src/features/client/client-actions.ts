

"use server";


import {
  createClient,
  deleteClient,
  updateClient,
} from "@/domain/client/client-repository";
import { ClientFormValues } from "@/ui/client/client-form.types";
import { mapClientFormToUI } from "@/ui/client/client-form.mapper";
import { mapClientUIToDbUpdate } from "@/domain/client/client-mapper";


/* ------------------------------------------------------------------ */
/* Action                                                              */
/* ------------------------------------------------------------------ */
export async function saveClient(
  data: ClientFormValues,
  clientId?: string
): Promise<void> {
  const clientUI = mapClientFormToUI(data);

  if (clientId) {
    await updateClient(clientId, mapClientUIToDbUpdate(clientUI));
  } else {
    await createClient(clientUI);
  }
}

/* ------------------------------------------------------------------ */
/* Delete                                                             */
/* ------------------------------------------------------------------ */

export async function deleteClientAction(
  clientId: string
): Promise<void> {
  await deleteClient(clientId);
}