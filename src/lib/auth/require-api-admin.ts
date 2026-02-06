

// src/lib/auth/require-api-admin.ts

import { requireApiOperateur } from "@/lib/auth/require-api-operateur";
import type { AuthenticatedOperateur } from "@/domain/operateur/authenticated-operateur.interface";

export async function requireApiAdmin(): Promise<AuthenticatedOperateur> {
  const operateur = await requireApiOperateur();

  if (!operateur.isAdminSys) {
    throw new Error("FORBIDDEN");
  }

  return operateur;
}