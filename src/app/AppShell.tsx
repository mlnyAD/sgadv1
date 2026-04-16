

"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";
import Header from "@/components/header/Header";
import { Separator } from "@/components/ui/separator";

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
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <AppSidebar collapsed={false} mode={mode} />

        {/* Zone principale */}
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          {/* HEADER */}
          <header className="flex h-16 items-center gap-2 border-b bg-background dark:bg-black">
            <div className="m-2 flex h-full w-full items-center gap-2">
              <SidebarTrigger className="rounded hover:bg-gray-200 dark:hover:bg-gray-800" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Header />
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