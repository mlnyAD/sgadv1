// src/app/(app)/layout.tsx
"use client";

import React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { UserContextProvider } from "@/contexts/UserContext";
import { MasterDataProvider } from "@/contexts/MasterDataProvider";
import Header from "@/components/Header/Header"; // <-- correction ici
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <UserContextProvider>
        <MasterDataProvider>
          <AppSidebar />

          <SidebarInset>
            {/* HEADER */}
            <header className="flex h-16 w-full items-center gap-2 border-b bg-background dark:bg-black">
              <div className="m-2 flex h-full w-full items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Header />
              </div>
            </header>

            {/* CONTENU */}
            <div className="size-full overflow-x-auto bg-gray-100 p-4 dark:bg-black">
              {children}
            </div>
          </SidebarInset>
        </MasterDataProvider>
      </UserContextProvider>

      <Toaster position="bottom-right" />
    </SidebarProvider>
  );
}
