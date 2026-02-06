

"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";
import Header from "@/components/header/Header";
import { Separator } from "@/components/ui/separator";
import { PanelLeft } from "lucide-react";

import { OperateurContextProvider } from "@/contexts/OperateurContext";
import { ClientContextProvider } from "@/contexts/ClientContext";

/* ------------------------------------------------------------------
 * AppShellInner : UI pure (sidebar + header + contenu)
 * ------------------------------------------------------------------ */

function AppShellInner({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

 
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <AppSidebar collapsed={collapsed} />

        {/* Zone principale */}
        <SidebarInset className="flex flex-col flex-1 min-w-0">
          {/* HEADER */}
          <header className="flex h-16 items-center gap-2 border-b bg-background dark:bg-black">
            <div className="m-2 flex h-full w-full items-center gap-2">
              <div
                onClick={() => setCollapsed(prev => !prev)}
                className="p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <PanelLeft className="h-6 w-6" />
              </div>

              <Separator orientation="vertical" className="mr-2 h-4" />
              <Header />
            </div>
          </header>

          {/* CONTENU */}
          <div className="flex-1 overflow-auto bg-gray-100 p-4 dark:bg-black">
            {children}
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
}: {
  children: React.ReactNode;
}) {
  return (
    <OperateurContextProvider>
      <ClientContextProvider>
        <AppShellInner>{children}</AppShellInner>
      </ClientContextProvider>
    </OperateurContextProvider>
  );
}
