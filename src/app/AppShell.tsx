

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
type ContentWidth = "default" | "list" | "form";

function getContentWidthClass(contentWidth: ContentWidth) {
  switch (contentWidth) {
    case "list":
      return "min-w-0 w-full";
    case "form":
      return "mx-auto min-w-0 w-full max-w-6xl";
    case "default":
    default:
      return "mx-auto min-w-0 w-full max-w-7xl";
  }
}

/* ------------------------------------------------------------------
 * AppShellInner : UI pure (sidebar + header + contenu)
 * ------------------------------------------------------------------ */

function AppShellInner({
  children,
  mode,
  contentWidth,
}: {
  children: React.ReactNode;
  mode: AppShellMode;
  contentWidth: ContentWidth;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar collapsed={false} mode={mode} />

        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center gap-2 border-b bg-background dark:bg-black">
            <div className="m-2 flex h-full w-full items-center gap-2">
              <SidebarTrigger className="rounded hover:bg-gray-200 dark:hover:bg-gray-800" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Header />
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-gray-100 p-4 dark:bg-black">
            <div className={getContentWidthClass(contentWidth)}>{children}</div>
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
  contentWidth = "default",
}: {
  children: React.ReactNode;
  mode?: AppShellMode;
  contentWidth?: ContentWidth;
}) {
  const content = (
    <AppShellInner mode={mode} contentWidth={contentWidth}>
      {children}
    </AppShellInner>
  );

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