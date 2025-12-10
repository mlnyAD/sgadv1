"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar/AppSidebar";
import { UserContextProvider, useUser } from "@/contexts/UserContext";
import Header from "@/components/Header/Header";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { PanelLeft } from "lucide-react";

function AppShellInner({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  if (loading) {
    return <div className="p-4">Chargement de l’utilisateur…</div>;
  }

  if (!user) {
    return <div className="p-4 text-red-600">User not loaded</div>;
  }

  return (
    <SidebarProvider>
      {/* Notre sidebar avec collapsed custom */}
      <AppSidebar collapsed={collapsed} />

      <SidebarInset>
        {/* HEADER */}
        <header className="flex h-16 items-center gap-2 border-b bg-background dark:bg-black">
          <div className="m-2 flex h-full w-full items-center gap-2">

            {/* Toggle sidebar → utiliser un div : pas de button imbriqué */}
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
