

import AppShell from "@/app/AppShell";
import Providers from "@/app/providers";
import { requireAppAccess } from "@/lib/auth/guards";

export default async function AppFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAppAccess();

  return (
    <Providers>
      <AppShell mode="app" contentWidth="form">
        {children}
      </AppShell>
    </Providers>
  );
}