

// src/app/(shared)/layout.tsx
import AppShell from "@/app/AppShell";
import Providers from "@/app/providers";
import { requireSharedAccess } from "@/lib/auth/guards";

export default async function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSharedAccess();

  return (
    <Providers>
      <AppShell mode="shared">{children}</AppShell>
    </Providers>
  );
}