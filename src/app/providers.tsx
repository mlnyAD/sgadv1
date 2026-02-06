

"use client";

import type { ReactNode } from "react";
import { OperateurContextProvider } from "@/contexts/OperateurContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <OperateurContextProvider>{children}</OperateurContextProvider>;
}

