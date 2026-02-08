

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

/* ------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------ */

export interface ClientContextClient {
  id: string;
  nom: string;
  code?: string;
}

interface ClientApiResponse {
  id: string | null;
  nom: string | null;
  multi?: boolean;
}

interface ClientContextValue {
  currentClient: ClientContextClient | null;
  setCurrentClient: (client: ClientContextClient | null) => void;
  multi: boolean;
  refreshClient: () => Promise<void>;
}

/* ------------------------------------------------------------------
 * Context
 * ------------------------------------------------------------------ */

const ClientContext = createContext<ClientContextValue | undefined>(undefined);

/* ------------------------------------------------------------------
 * Provider
 * ------------------------------------------------------------------ */

export function ClientContextProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [currentClient, setCurrentClient] = useState<ClientContextClient | null>(null);
  const [multi, setMulti] = useState(false);

  const refreshClient = useCallback(async () => {
    try {
      const res = await fetch("/api/client", {
        cache: "no-store",
        credentials: "same-origin",
      });

      if (!res.ok) {
        setCurrentClient(null);
        setMulti(false);
        return;
      }

      const json = (await res.json()) as ClientApiResponse;

      setMulti(!!json.multi);

      if (json?.id) {
        setCurrentClient({ id: json.id, nom: json.nom ?? "—" });
      } else {
        setCurrentClient(null);
      }
    } catch {
      // silencieux
    }
  }, []);

  useEffect(() => {
    // IMPORTANT : sur /select-client, on ne fetch pas /api/client
    // (cela peut déclencher des redirections/ensure selon ton implémentation)
    if (pathname === "/select-client") return;

    void refreshClient();
  }, [pathname, refreshClient]);

  const value = useMemo(
    () => ({
      currentClient,
      setCurrentClient,
      multi,
      refreshClient,
    }),
    [currentClient, multi, refreshClient]
  );

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
}

/* ------------------------------------------------------------------
 * Hooks
 * ------------------------------------------------------------------ */

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within ClientContextProvider");
  }
  return context;
}

export function useClientOptional() {
  return useContext(ClientContext);
}