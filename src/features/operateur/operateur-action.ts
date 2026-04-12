

// src/features/operateur/operateur-action.ts

"use server";

import type {
  OperateurView,
  OperateurSaveResult,
} from "@/domain/operateur/operateur-types";
import {
  updateOperateur,
} from "@/domain/operateur/operateur.repository";
import { createOperateurAction } from "@/domain/operateur/operateur.action";
import { deleteOperateurAction } from "@/domain/operateur/delete-operateur.action";
import { requireOperateur } from "@/lib/auth/require-operateur";

export async function saveOperateur(
  operateur: OperateurView
): Promise<OperateurSaveResult> {
  const currentOperateur = await requireOperateur();

  if (!currentOperateur.isAdminSys) {
    throw new Error("Accès interdit");
  }

  if (operateur.id) {
    await updateOperateur(operateur.id, operateur);
    return { kind: "updated" };
  }

  const { tempPassword } = await createOperateurAction(operateur);
  return { kind: "created", tempPassword };
}

export async function deleteOperateurServerAction(
  operateurId: string
): Promise<void> {
  await deleteOperateurAction(operateurId);
}