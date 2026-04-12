

// src/domain/operateur/operateur.action.ts
"use server";

import type { OperateurView } from "./operateur-types";
import { createOperateur } from "./operateur.repository";
import {
  createOperateurWithAuth,
  rollbackOperateurAuth,
} from "@/lib/operateur/create-operateur-with-auth";
import { requireOperateur } from "@/lib/auth/require-operateur";

export async function createOperateurAction(
  operateur: OperateurView
): Promise<{ tempPassword: string }> {
  const currentOperateur = await requireOperateur();

  if (!currentOperateur.isAdminSys) {
    throw new Error("Accès interdit");
  }

  const { operId, tempPassword } = await createOperateurWithAuth(operateur.email);

  try {
    await createOperateur({
      ...operateur,
      id: operId,
      mustChangePassword: true,
      actif: operateur.actif ?? true,
    });

    return { tempPassword };
  } catch (e) {
    await rollbackOperateurAuth(operId);
    throw e;
  }
}