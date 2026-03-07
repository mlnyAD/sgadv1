

"use client";

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
            <NavTop />
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