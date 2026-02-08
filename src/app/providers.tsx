

// src/app/providers.tsx
"use client";

import type { ReactNode } from "react";
import { OperateurContextProvider } from "@/contexts/OperateurContext";
import { ClientContextProvider } from "@/contexts/ClientContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OperateurContextProvider>
      <ClientContextProvider>{children}</ClientContextProvider>
    </OperateurContextProvider>
  );
}