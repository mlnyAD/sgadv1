

import AppShell from "@/app/AppShell";
import Providers from "@/app/providers";
import { requireOperateur } from "@/lib/auth/require-operateur";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    
  const operateur = await requireOperateur();

  //console.log("Passage dans Admlin layout op =", operateur)

  if (!operateur.isAdminSys) {
    redirect("/dashboard");
  }

  return (
    <Providers>
      <AppShell>{children}</AppShell>
    </Providers>
  );
}