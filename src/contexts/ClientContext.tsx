

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

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

const ClientContext = createContext<ClientContextValue | undefined>(undefined);

function parseRetryAfterSeconds(res: Response): number | null {
  const v = res.headers.get("retry-after");
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function ClientContextProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [currentClient, setCurrentClient] = useState<ClientContextClient | null>(null);
  const [multi, setMulti] = useState(false);

  // Anti-spam / backoff
  const inFlightRef = useRef(false);
  const lastOkAtRef = useRef<number>(0);
  const blockedUntilRef = useRef<number>(0);

  const refreshClient = useCallback(async () => {
    // ne pas refetch si déjà en cours
    if (inFlightRef.current) return;

    const now = Date.now();

    // backoff actif
    if (now < blockedUntilRef.current) return;

    // throttle : si on a eu un OK il y a < 30s, inutile de refetch à chaque route
    if (lastOkAtRef.current && now - lastOkAtRef.current < 30_000) return;

    inFlightRef.current = true;

    try {
      const res = await fetch("/api/client", {
        cache: "no-store",
        credentials: "same-origin",
      });

      // 401 => pas authentifié : on stoppe (pas de boucle)
      if (res.status === 401) {
        setCurrentClient(null);
        setMulti(false);
        // on bloque un peu pour éviter spam si l'app rerender
        blockedUntilRef.current = Date.now() + 60_000;
        return;
      }

      // 429 => rate limit : backoff
      if (res.status === 429) {
        const retryAfter = parseRetryAfterSeconds(res);
        const ms = (retryAfter ?? 30) * 1000; // fallback 30s
        blockedUntilRef.current = Date.now() + ms;
        return;
      }

      if (!res.ok) {
        // erreur transitoire : on ne reset pas tout (évite cascades)
        // on bloque un peu
        blockedUntilRef.current = Date.now() + 10_000;
        return;
      }

      const json = (await res.json()) as ClientApiResponse;

      setMulti(!!json.multi);

      if (json?.id) {
        setCurrentClient({ id: json.id, nom: json.nom ?? "—" });
      } else {
        setCurrentClient(null);
      }

      lastOkAtRef.current = Date.now();
    } catch {
      // réseau / autre : backoff court
      blockedUntilRef.current = Date.now() + 10_000;
    } finally {
      inFlightRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (pathname === "/select-client") return;

    // première charge / changements de route : on tente, mais avec throttle + backoff
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

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) throw new Error("useClient must be used within ClientContextProvider");
  return context;
}

export function useClientOptional() {
  return useContext(ClientContext);
}