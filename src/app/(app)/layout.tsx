

// src/app/(app)/layout.tsx
import AppShell from "@/app/AppShell";
import Providers from "@/app/providers";
import { requireAppAccess } from "@/lib/auth/guards";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAppAccess();

  return (
    <Providers>
      <AppShell mode="app">{children}</AppShell>
    </Providers>
  );
}