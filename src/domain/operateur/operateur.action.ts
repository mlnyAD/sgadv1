

// src/domain/operateur/operateur.action.ts
"use server";

import type { OperateurView } from "./operateur-types";
import { createOperateur } from "./operateur.repository";
import { createOperateurWithAuth, rollbackOperateurAuth } from "@/lib/operateur/create-operateur-with-auth";

export async function createOperateurAction(
  operateur: OperateurView
): Promise<{ tempPassword: string }> {
  const { operId, tempPassword } = await createOperateurWithAuth(operateur.email);

  try {
    await createOperateur({
      ...operateur,
      id: operId,
      // invariant onboarding Solution A
      mustChangePassword: true,
      // généralement actif=true à la création (vous pouvez forcer)
      actif: operateur.actif ?? true,
    });

    return { tempPassword };
  } catch (e) {
    await rollbackOperateurAuth(operId);
    throw e;
  }
}