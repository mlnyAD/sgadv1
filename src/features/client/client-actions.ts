

"use server";


import {
  createClient,
  deleteClient,
  updateClient,
} from "@/domain/client/client-repository";
import { ClientPersistencePayload } from "@/domain/client/client-types"
import { ClientFormValues } from "@/ui/client/client-form.types";


/* ------------------------------------------------------------------ */
/* Action                                                              */
/* ------------------------------------------------------------------ */

export async function saveClient(
  data: ClientFormValues,
  clientId?: string
): Promise<void> {

  const payload: ClientPersistencePayload = {
	client_nom: data.nom,
	client_code: data.code,
	adresse: data.adresse,
	code_postal: data.codePostal,
	ville: data.ville,
	pays: data.pays,
	email: data.email,
	telephone: data.telephone,
	actif: data.actif,
  };

  if (clientId) {
	// ✏️ UPDATE
	await updateClient(clientId.toString(), payload);
  } else {
	// ➕ CREATE
	await createClient(payload);
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