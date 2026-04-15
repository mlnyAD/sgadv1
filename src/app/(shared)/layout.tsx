

// src/app/(shared)/layout.tsx
import { requireOperateur } from "@/lib/auth/require-operateur";

export default async function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireOperateur();

  return <>{children}</>;
}