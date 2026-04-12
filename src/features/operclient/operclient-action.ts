

// src/features/operclient/operclient-action.ts
"use server";

import {
  upsertOperClientAssociation,
  deleteOperClientAssociationByKeys,
} from "@/domain/operclient/operclient.repository";
import { requireOperateur } from "@/lib/auth/require-operateur";

export async function saveOperClient(params: {
  operateurId: string;
  clientId: string;
}): Promise<void> {
  const currentOperateur = await requireOperateur();

  if (!currentOperateur.isAdminSys) {
    throw new Error("Accès interdit");
  }

  if (!params.operateurId || !params.clientId) {
    throw new Error("operateurId et clientId sont requis");
  }

  await upsertOperClientAssociation(params);
}

export async function deleteOperClient(params: {
  operateurId: string;
  clientId: string;
}): Promise<void> {
  const currentOperateur = await requireOperateur();

  if (!currentOperateur.isAdminSys) {
    throw new Error("Accès interdit");
  }

  if (!params.operateurId || !params.clientId) {
    throw new Error("operateurId et clientId sont requis");
  }

  await deleteOperClientAssociationByKeys(params);
}