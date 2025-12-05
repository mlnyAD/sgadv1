// src/app/AppShell.tsx
"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { UserContextProvider, useUser } from "@/contexts/UserContext";
import Header from "@/components/Header/Header";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

function AppShellInner({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="p-4">Chargement de l’utilisateur…</div>;
  }

  if (!user) {
    return <div className="p-4 text-red-600">User not loaded</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b bg-background dark:bg-black">
          <div className="m-2 flex h-full w-full items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Header />
          </div>
        </header>

        <div className="size-full overflow-x-auto bg-gray-100 p-4 dark:bg-black">
          {children}
        </div>
      </SidebarInset>

      <Toaster position="bottom-right" />
    </SidebarProvider>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider>
      <AppShellInner>{children}</AppShellInner>
    </UserContextProvider>
  );
}
