

"use client";

import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";
import Header from "@/components/header/Header";
import { Separator } from "@/components/ui/separator";
import { useOperateur } from "@/contexts/OperateurContext";

interface AppShellProps {
  children?: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { operateur, loading } = useOperateur();

  return (
    <SidebarProvider>
      {/* Sidebar seulement si operateur chargé */}
      {!loading && operateur ? <AppSidebar collapsed={false} /> : null}

      <SidebarInset>
        <Header />
        <Separator />
        <main className="flex-1 p-4">
          {loading ? <div>Chargement…</div> : children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
