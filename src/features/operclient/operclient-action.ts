

// src/features/operclient/operclient-action.ts
"use server";

import {
  upsertOperClientAssociation,
  deleteOperClientAssociationByKeys,
} from "@/domain/operclient/operclient.repository";

export async function saveOperClient(params: {
  operateurId: string;
  clientId: string;
}): Promise<void> {
  if (!params.operateurId || !params.clientId) {
    throw new Error("operateurId et clientId sont requis");
  }
  await upsertOperClientAssociation(params);
}

export async function deleteOperClient(params: {
  operateurId: string;
  clientId: string;
}): Promise<void> {
  if (!params.operateurId || !params.clientId) {
    throw new Error("operateurId et clientId sont requis");
  }
  await deleteOperClientAssociationByKeys(params);
}