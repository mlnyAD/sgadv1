

import AppShell from "@/app/AppShell";
import Providers from "@/app/providers";
import { requireOperateur } from "@/lib/auth/require-operateur";

export default async function AppLayout({ children }: { children: React.ReactNode }) {

  await requireOperateur();
  
  return (
    <Providers>
      <AppShell>{children}</AppShell>
    </Providers>
  );
}