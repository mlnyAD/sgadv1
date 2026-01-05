"use client";

import {
  FolderKanban,
  Users,
  Settings2,
  Building2,
  Contact,
  FileStack,
  ListTodo,
  AlertTriangle,
  KanbanSquare,      // Icône pour "Opérations"
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import SidebarMenuItems from "./SidebarMenuItems";

import type { NavItem } from "./Types";
import { USER_ROLES } from "@/shared/catalogs/user-role.constants";
import type { UserRoleId } from "@/domain/user/roles/user-role.type";
import { useSidebar } from "@/components/ui/sidebar";

interface NavMainProps {
  roleId: UserRoleId;
}

// Rôles autorisés pour certains menus
const ADMIN = [
  USER_ROLES.SYSTEM_ADMIN.id,
  USER_ROLES.CLIENT_ADMIN.id,
  USER_ROLES.PROJECT_ADMIN.id,
];

// Menu principal
const ITEMS: NavItem[] = [
{
  id: "projects",
  title: "Projets",
  href: "/projects",
  icon: FolderKanban,
},
{
  id: "clients",
  title: "Clients",
  href: "/clients",
  icon: Building2,
  roles: [USER_ROLES.SYSTEM_ADMIN.id],
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
    id: "societes",
    title: "Sociétés",
    href: "/societes",
    icon: Building2,
    roles: ADMIN,
  },
  {
    id: "contacts",
    title: "Contacts",
    href: "/operators",
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
    href: "/todos",
    icon: ListTodo,
  },
  {
    id: "risks",
    title: "Risques",
    href: "/risks",
    icon: AlertTriangle,
  },
];

// Filtrage automatique des menus selon le rôle
function filterByRole(roleId: UserRoleId): NavItem[] {
  return ITEMS.filter((i) => !i.roles || i.roles.includes(roleId));
}

export default function NavMain({ roleId }: NavMainProps) {
  const items = filterByRole(roleId);

  // Lecture collapsed du sidebar (shadcn)
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarGroup>

      {/* Titre "Opérations" AVEC ICÔNE, compatible collapsed */}
      <SidebarGroupLabel>
        <div className="flex items-center gap-2 px-2 py-1">
          <KanbanSquare className="h-4 w-4" />
          {!collapsed && "Opérations"}
        </div>
      </SidebarGroupLabel>

      {/* Menu principal dynamique */}
      <SidebarMenuItems items={items} />
    </SidebarGroup>
  );
}
