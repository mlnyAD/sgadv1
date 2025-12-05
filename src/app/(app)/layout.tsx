// src/app/(app)/layout.tsx
import type { ReactNode } from "react";
import AppShell from "../AppShell";

export default function AppSectionLayout({ children }: { children: ReactNode }) {
  // Pas de user ici
  return <AppShell>{children}</AppShell>;
}
