

"use client";

import NavMain from "./NavMain";
import { NavTop } from "./NavTop";
import NavUser from "./NavUser";
import { useOperateur } from "@/contexts/OperateurContext";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

type AppShellMode = "shared" | "app" | "admin";

type AppSidebarProps = {
  collapsed: boolean;
  mode: AppShellMode;
};

export default function AppSidebar({ collapsed, mode }: AppSidebarProps) {
  void collapsed;

  const { operateur } = useOperateur();
  const isAdmin = operateur?.isAdminSys ?? false;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavTop />
      </SidebarHeader>

      <SidebarContent>
        <NavMain isAdmin={isAdmin} mode={mode} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}