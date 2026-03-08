

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { useOperateur } from "@/contexts/OperateurContext";
import { NavTop } from "./NavTop";

type CurrentClientPayload = {
  current: null | {
    cltId: string;
    cltNom: string;
    cltLogoUrl?: string | null;
  };
};

function SidebarSkeleton({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <SidebarHeader className="border-b px-4 py-4 flex items-center justify-center">
        <NavTop />
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto px-2 pt-4 space-y-6">
        <div className="space-y-2 px-2">
          <div className={cn("rounded bg-muted animate-pulse", collapsed ? "h-8" : "h-8 w-full")} />
          <div className={cn("rounded bg-muted animate-pulse", collapsed ? "h-8" : "h-8 w-full")} />
          <div className={cn("rounded bg-muted animate-pulse", collapsed ? "h-8" : "h-8 w-full")} />
          <div className={cn("rounded bg-muted animate-pulse", collapsed ? "h-8" : "h-8 w-full")} />
          <div className={cn("rounded bg-muted animate-pulse", collapsed ? "h-8" : "h-8 w-full")} />
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t px-2 py-4">
        <div className="px-2">
          <div className="h-10 rounded bg-muted animate-pulse" />
        </div>
      </SidebarFooter>
    </>
  );
}

export default function AppSidebar({ collapsed }: { collapsed: boolean }) {
  const { operateur, loading } = useOperateur();

  const [clientLogoUrl, setClientLogoUrl] = useState<string | null>(null);
  const [clientLogoAlt, setClientLogoAlt] = useState("Logo Axcio Data");

  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    let cancelled = false;

    async function loadCurrentClient() {
      try {
        const response = await fetch("/api/current-client", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;

        const json = (await response.json()) as CurrentClientPayload;

        if (cancelled) return;

        if (json.current?.cltLogoUrl) {
          setClientLogoUrl(json.current.cltLogoUrl);
          setClientLogoAlt(
            json.current.cltNom ? `Logo ${json.current.cltNom}` : "Logo client",
          );
        }
      } catch {
        // on garde le logo par défaut
      }
    }

    void loadCurrentClient();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Sidebar
      data-collapsed={collapsed ? "true" : "false"}
      className={cn(
        "border-r bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-200",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {loading || !operateur ? (
        <SidebarSkeleton collapsed={collapsed} />
      ) : (
        <>
          <SidebarHeader className="border-b px-4 py-4 flex items-center justify-center">
            <NavTop logoUrl={clientLogoUrl} alt={clientLogoAlt} />
          </SidebarHeader>

          <SidebarContent className="flex-1 overflow-y-auto px-2 pt-4 space-y-6">
            <NavMain isAdmin={operateur.isAdminSys} />
          </SidebarContent>

          <SidebarFooter className="border-t px-2 py-4">
            <NavUser />
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  );
}