"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { UserContextProvider } from "@/contexts/UserContext";
//import { MasterDataProvider } from "@/contexts/MasterDataProvider";
import Header from "@/components/Header/Header";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <UserContextProvider>
    
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

      </UserContextProvider>
    </SidebarProvider>
  );
}
