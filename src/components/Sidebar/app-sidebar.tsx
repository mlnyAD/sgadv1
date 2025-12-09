"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

import NavMain from "./nav-main";
import NavSoutien from "./nav-soutien";
import NavUser from "./nav-user";

import { useUser } from "@/contexts/UserContext";
import { getRoleIdFromUser } from "@/domain/user/roles/user-role.type";

export default function AppSidebar({ collapsed }: { collapsed: boolean }) {
  const { user } = useUser();
  const roleId = getRoleIdFromUser(user);

  return (
    <Sidebar
      className={cn(
        "border-r bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* HEADER */}
      <SidebarHeader className="border-b px-4 py-4 flex items-center gap-3">

        <Image
          src="/logos/axcio-data.svg"
          alt="Axcio Data"
          width={collapsed ? 32 : 40}
          height={collapsed ? 32 : 40}
          className="rounded-md transition-all duration-300"
        />

        {!collapsed && (
          <div className="flex flex-col leading-tight transition-opacity duration-300">
            <span className="font-semibold text-base">Easy Project V2</span>
            <span className="text-xs text-muted-foreground">par Axcio Data</span>
          </div>
        )}
      </SidebarHeader>

      {/* NAV */}
      <SidebarContent className="flex-1 overflow-y-auto px-2 pt-4 space-y-6">
        <NavMain roleId={roleId} />
        <NavSoutien />
      </SidebarContent>

      {/* USER */}
      <SidebarFooter className="border-t px-2 py-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
