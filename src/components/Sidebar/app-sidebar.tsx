// src/components/Sidebar/app-sidebar.tsx
"use client";

import * as React from "react";

import {
  Activity,
  BookOpen,
  BookText,
  Building2,
  CircleX,
  Cog,
  FileQuestion,
  HandHelping,
  Hourglass,
  LayoutDashboard,
  ListChecks,
  SquareTerminal,
  TriangleAlert,
  Users,
  UsersRound,
} from "lucide-react";

import { NavMain } from "@/components/Sidebar/nav-main";
import { NavSoutien } from "@/components/Sidebar/nav-soutien";
import NavUser from "@/components/Sidebar/nav-user";
import { NavTop } from "@/components/Sidebar/nav-top";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import type { NavItem, SupportItem } from "./types";

const navMain: NavItem[] = [
  { title: "Tableau de bord général", url: "/system/dashboardSociete", icon: LayoutDashboard },
  { title: "Projets en cours", url: "/projects/projectList/run", icon: SquareTerminal },
  { title: "Projets en attente", url: "/projects/projectList/wait", icon: Hourglass },
  { title: "Projets terminés", url: "/projects/projectList/finish", icon: CircleX },
  { title: "Equipes", url: "/equipes/equipeList", icon: UsersRound },
  { title: "Configurations", url: "/configs", icon: Cog },
  { title: "Sociétés", url: "/societes/societeList", icon: Building2 },
  { title: "Contacts", url: "/contacts/contactsList", icon: Users },
  { title: "Critères de GED", url: "/critGed/critGedList", icon: BookText },
  { title: "TODO Liste", url: "/todoList/todoList", icon: ListChecks },
  { title: "Risques", url: "#", icon: TriangleAlert },
];

const supports: SupportItem[] = [
  { title: "Aide en ligne", url: "/settings", icon: FileQuestion },
  { title: "Support", url: "/settings", icon: HandHelping },
  { title: "Activité chat", url: "/dailyChat", icon: SquareTerminal },
  { title: "Activités", url: "/activites/activiteList", icon: Activity },
  { title: "Bibliothèque technique", url: "#", icon: BookOpen },
  { title: "Documentation Projet", url: "#", icon: BookOpen },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="border-r bg-card text-foreground dark:bg-black"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <NavTop />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
        <NavSoutien supports={supports} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
