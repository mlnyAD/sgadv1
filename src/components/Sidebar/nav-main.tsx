"use client";

import {
  LayoutDashboard,
  FolderKanban,
  Clock,
  History,
  Users,
  Settings2,
  Building2,
  Contact,
  FileStack,
  ListTodo,
  AlertTriangle,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import SidebarMenuItems from "./SidebarMenuItems";
import type { NavItem } from "./types";
import { USER_ROLES, type UserRoleId } from "@/domain/user/roles/user-role.enum";

interface NavMainProps {
  roleId: UserRoleId;
}

const ADMIN = [
  USER_ROLES.SYSTEM_ADMIN.id,
  USER_ROLES.CLIENT_ADMIN.id,
  USER_ROLES.PROJECT_ADMIN.id,
];

const ITEMS: NavItem[] = [
  {
    id: "dashboard",
    title: "Tableau de bord général",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "projects-current",
    title: "Projets en cours",
    href: "/projects/current",
    icon: FolderKanban,
  },
  {
    id: "projects-pending",
    title: "Projets en attente",
    href: "/projects/pending",
    icon: Clock,
  },
  {
    id: "projects-done",
    title: "Projets terminés",
    href: "/projects/done",
    icon: History,
  },
  {
    id: "teams",
    title: "Équipes",
    href: "/teams",
    icon: Users,
  },
  {
    id: "configs",
    title: "Configurations",
    href: "/configs",
    icon: Settings2,
    roles: ADMIN,
  },
  {
    id: "companies",
    title: "Sociétés",
    href: "/companies",
    icon: Building2,
    roles: ADMIN,
  },
  {
    id: "contacts",
    title: "Contacts",
    href: "/contacts",
    icon: Contact,
  },
  {
    id: "ged",
    title: "Critères GED",
    href: "/ged",
    icon: FileStack,
    roles: ADMIN,
  },
  {
    id: "todo",
    title: "TODO Liste",
    href: "/todo",
    icon: ListTodo,
  },
  {
    id: "risks",
    title: "Risques",
    href: "/risks",
    icon: AlertTriangle,
  },
];

function filterByRole(roleId: UserRoleId): NavItem[] {
  return ITEMS.filter((i) => !i.roles || i.roles.includes(roleId));
}

export default function NavMain({ roleId }: NavMainProps) {
  const items = filterByRole(roleId);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Opérations</SidebarGroupLabel>
      <SidebarMenuItems items={items} />
    </SidebarGroup>
  );
}
