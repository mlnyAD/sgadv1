

"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------ */

export interface ClientContextClient {
  id: string;
  nom: string;
  code?: string;
}

interface ClientContextValue {
  currentClient: ClientContextClient | null;
  setCurrentClient: (client: ClientContextClient | null) => void;
}

/* ------------------------------------------------------------------
 * Context
 * ------------------------------------------------------------------ */

const ClientContext = createContext<ClientContextValue | undefined>(
  undefined
);

/* ------------------------------------------------------------------
 * Provider
 * ------------------------------------------------------------------ */

export function ClientContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentClient, setCurrentClient] =
    useState<ClientContextClient | null>(null);

  return (
    <ClientContext.Provider
      value={{
        currentClient,
        setCurrentClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

/* ------------------------------------------------------------------
 * Hook
 * ------------------------------------------------------------------ */

export function useClient() {
  
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error(
      "useClient must be used within ClientContextProvider"
    );
  }

  return context;
}
