

// src/features/operateur/operateur-action.ts
"use server";

import type { OperateurView, OperateurSaveResult } from "@/domain/operateur/operateur-types";
import { updateOperateur } from "@/domain/operateur/operateur.repository";
import { createOperateurAction } from "@/domain/operateur/operateur.action";

export async function saveOperateur(operateur: OperateurView): Promise<OperateurSaveResult> {
  if (operateur.id) {
    await updateOperateur(operateur.id, operateur);
    return { kind: "updated" };
  }

  const { tempPassword } = await createOperateurAction(operateur);
  return { kind: "created", tempPassword };
}