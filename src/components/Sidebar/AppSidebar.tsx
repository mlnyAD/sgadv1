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
import NavSoutien from "./NavSoutien";
import NavUser from "./NavUser";

import { useUser } from "@/contexts/UserContext";
import { getRoleIdFromUser } from "@/domain/user/roles/user-role.type";

export default function AppSidebar({ collapsed }: { collapsed: boolean }) {
  const { user } = useUser();
  const roleId = getRoleIdFromUser(user);

  return (
    <Sidebar
      data-collapsed={collapsed ? "true" : "false"}
      className={cn(
        "border-r bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* HEADER (logo uniquement) */}
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
        <NavMain roleId={roleId} />
        <NavSoutien />
      </SidebarContent>

      <SidebarFooter className="border-t px-2 py-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
