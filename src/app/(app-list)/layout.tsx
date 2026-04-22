

// src/app/(app-list)/layout.tsx

import AppShell from "@/app/AppShell";
import Providers from "@/app/providers";
import { requireAppAccess } from "@/lib/auth/guards";

export default async function AppListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAppAccess();

  return (
    <Providers>
      <AppShell mode="app" contentWidth="list">
        {children}
      </AppShell>
    </Providers>
  );
}