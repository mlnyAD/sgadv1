

"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";
import Header from "@/components/header/Header";
import { Separator } from "@/components/ui/separator";
import { PanelLeft } from "lucide-react";

import { OperateurContextProvider } from "@/contexts/OperateurContext";
import { ClientContextProvider } from "@/contexts/ClientContext";

type AppShellMode = "shared" | "app" | "admin";

/* ------------------------------------------------------------------
 * AppShellInner : UI pure (sidebar + header + contenu)
 * ------------------------------------------------------------------ */

function AppShellInner({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: AppShellMode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <AppSidebar collapsed={collapsed} mode={mode} />

        {/* Zone principale */}
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          {/* HEADER */}
          <header className="flex h-16 items-center gap-2 border-b bg-background dark:bg-black">
            <div className="m-2 flex h-full w-full items-center gap-2">
              <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                className="rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
                aria-label="Ouvrir ou fermer le menu latéral"
              >
                <PanelLeft className="h-6 w-6" />
              </button>

              <Separator orientation="vertical" className="mr-2 h-4" />
              <Header mode={mode} />
            </div>
          </header>

          {/* CONTENU */}
          <div className="flex-1 overflow-auto bg-gray-100 p-4 dark:bg-black">
            <div className="mx-auto min-w-0 max-w-7xl">{children}</div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

/* ------------------------------------------------------------------
 * AppShell : Providers + UI
 * ------------------------------------------------------------------ */

export default function AppShell({
  children,
  mode = "shared",
}: {
  children: React.ReactNode;
  mode?: AppShellMode;
}) {
  const content = <AppShellInner mode={mode}>{children}</AppShellInner>;

  return (
    <OperateurContextProvider>
      {mode === "app" ? (
        <ClientContextProvider>{content}</ClientContextProvider>
      ) : (
        content
      )}
    </OperateurContextProvider>
  );
}