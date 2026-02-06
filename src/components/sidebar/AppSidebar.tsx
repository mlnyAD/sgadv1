

"use client";

import Image from "next/image";
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

export default function AppSidebar({ collapsed }: { collapsed: boolean }) {

  const { operateur, loading } = useOperateur();
  
  //console.log("Appsidebar, operateur = ", operateur);

  if (loading || !operateur) {
    return null; // ou Skeleton
  }

  return (
    <Sidebar
      data-collapsed={collapsed ? "true" : "false"}
      className={cn(
        "border-r bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <SidebarHeader className="border-b px-4 py-4 flex items-center justify-center">
        <Image
          src="/images/axcio_data.png"
          alt="Logo Axcio Data"
          width={collapsed ? 40 : 120}
          height={collapsed ? 40 : 120}
          className="h-auto w-auto transition-all duration-300"
        />
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto px-2 pt-4 space-y-6">
        <NavMain isAdmin={operateur.isAdminSys} />
      </SidebarContent>

      <SidebarFooter className="border-t px-2 py-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
