

"use server";

import { createClient, deleteClient, updateClient } from "@/domain/client/client-repository";
import type { ClientFormValues } from "@/ui/client/client-form.types";
import { mapClientFormToInsert, mapClientFormToUpdate } from "@/domain/client/client-mapper";


/* ------------------------------------------------------------------ */
/* Action                                                              */
/* ------------------------------------------------------------------ */
/*export async function saveClient(data: ClientFormValues, clientId?: string): Promise<void> {
  if (clientId) {
    await updateClient(clientId, mapClientFormToUpdate(data));
  } else {
    await createClient(mapClientFormToInsert(data));
  }
}*/
export async function saveClient(data: ClientFormValues, clientId?: string): Promise<void> {
  console.log("saveClient:start", { clientId, data });

  if (clientId) {
    await updateClient(clientId, mapClientFormToUpdate(data));
    console.log("saveClient:update:done", { clientId });
  } else {
    const newId = await createClient(mapClientFormToInsert(data));
    console.log("saveClient:create:done", { newId });
  }

  console.log("saveClient:end");
}

/* ------------------------------------------------------------------ */
/* Delete                                                              */
/* ------------------------------------------------------------------ */
export async function deleteClientAction(clientId: string): Promise<void> {
  await deleteClient(clientId);
}