

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthenticatedOperateur } from "@/domain/operateur/authenticated-operateur.interface";

interface OperateurContextValue {
  operateur: AuthenticatedOperateur | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const OperateurContext = createContext<OperateurContextValue | undefined>(
  undefined
);

export function OperateurContextProvider({ children }: { children: ReactNode }) {

  const [operateur, setOperateur] = useState<AuthenticatedOperateur | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      // IMPORTANT: on passe par l’API App Router (cookies/session côté serveur)
      const res = await fetch("/api/auth/me", { credentials: "include" });

      if (!res.ok) {
        setOperateur(null);
        setLoading(false);
        return;
      }

      const data = (await res.json()) as { operateur?: AuthenticatedOperateur };

      setOperateur(data.operateur ?? null);
      setLoading(false);
    } catch {
      setOperateur(null);
      setLoading(false);
    }
  };

useEffect(() => {
  let mounted = true;

  (async () => {
    if (mounted) {
      await refresh();
    }
  })();

  return () => {
    mounted = false;
  };
}, []);


  return (
    <OperateurContext.Provider value={{ operateur, loading, refresh }}>
      {children}
    </OperateurContext.Provider>
  );
}

export function useOperateur(): OperateurContextValue {
  
  const ctx = useContext(OperateurContext);
  if (!ctx) {
    throw new Error(
      "useOperateur must be used within OperateurContextProvider"
    );
  }
  return ctx;
}
