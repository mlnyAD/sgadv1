

"use server";

import { createClient, deleteClient, updateClient } from "@/domain/client/client-repository";
import type { ClientFormValues } from "@/ui/client/client-form.types";
import { mapClientFormToInsert, mapClientFormToUpdate } from "@/domain/client/client-mapper";


/* ------------------------------------------------------------------ */
/* Action                                                              */
/* ------------------------------------------------------------------ */
export async function saveClient(data: ClientFormValues, clientId?: string): Promise<void> {
  if (clientId) {
    await updateClient(clientId, mapClientFormToUpdate(data));
  } else {
    await createClient(mapClientFormToInsert(data));
  }
}

/* ------------------------------------------------------------------ */
/* Delete                                                              */
/* ------------------------------------------------------------------ */
export async function deleteClientAction(clientId: string): Promise<void> {
  await deleteClient(clientId);
}