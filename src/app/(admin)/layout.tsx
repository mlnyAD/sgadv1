

// src/app/(admin)/layout.tsx
import AppShell from "@/app/AppShell";
import Providers from "@/app/providers";
import { requireAdminAccess } from "@/lib/auth/guards";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminAccess();

  return (
    <Providers>
      <AppShell mode="admin">{children}</AppShell>
    </Providers>
  );
}