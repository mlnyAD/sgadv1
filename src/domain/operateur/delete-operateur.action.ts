

"use server";

import { requireOperateur } from "@/lib/auth/require-operateur";
import {
  deleteOperateur,
  getOperateurById,
} from "@/domain/operateur/operateur.repository";
import { deleteOperateurAuth } from "@/lib/operateur/create-operateur-with-auth";

export async function deleteOperateurAction(
  operateurId: string
): Promise<void> {
  const currentOperateur = await requireOperateur();

  if (!currentOperateur.isAdminSys) {
    throw new Error("Accès interdit");
  }

  if (!operateurId) {
    throw new Error("operateurId requis");
  }

  if (currentOperateur.operId === operateurId) {
    throw new Error("Vous ne pouvez pas supprimer votre propre compte.");
  }

  const operateur = await getOperateurById(operateurId);
  if (!operateur) {
    throw new Error("Opérateur introuvable.");
  }

  // 1. suppression métier si aucune association operateur_client
  await deleteOperateur(operateurId);

  // 2. suppression du compte Auth
  await deleteOperateurAuth(operateurId);
}