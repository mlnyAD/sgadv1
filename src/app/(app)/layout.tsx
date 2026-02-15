

// src/app/(app)/layout.tsx
import AppShell from "@/app/AppShell";
import Providers from "@/app/providers";
import { requireOperateur } from "@/lib/auth/require-operateur";
import { getCurrentClient } from "@/domain/session/current-client";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode }) {

  const operateur = await requireOperateur();

    //console.log("requireOperateur op =", operateur)
    
  if (operateur.isAdminSys) {
    redirect("/dashboard-admin");
  }

  const { current } = await getCurrentClient();

  // si pas de client courant, on passe par ensure + retour vers dashboard
  if (!current) {
    //console.log("AppLayout avant appel dashboard current = ", current )
    redirect("/api/client/ensure?next=/dashboard");
  }

  return (
    <Providers>
      <AppShell>{children}</AppShell>
    </Providers>
  );
}