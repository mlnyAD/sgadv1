

// src/lib/auth/guards.ts
import { redirect } from "next/navigation";

import { requireOperateur } from "@/lib/auth/require-operateur";
import { getCurrentClient } from "@/domain/session/current-client";

export async function requireSharedAccess() {
  const operateur = await requireOperateur();
  return { operateur };
}

export async function requireAdminAccess() {
  const operateur = await requireOperateur();

  if (!operateur.isAdminSys) {
    redirect("/dashboard");
  }

  return { operateur };
}

export async function requireAppAccess() {
  const operateur = await requireOperateur();

  if (operateur.isAdminSys) {
    redirect("/dashboard-admin");
  }

  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/dashboard",
  });

  if (!current) {
    redirect("/api/client/ensure?next=/dashboard");
  }

  return { operateur, current };
}