"use client";

import {
  Building2,
  Contact,
  FileStack,
  ListTodo,
  Settings2,
  Users,
  Presentation,
  KeyRound,
  KanbanSquare,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import SidebarMenuItems from "./SidebarMenuItems";
import type { NavItem } from "./Types";
import { useSidebar } from "@/components/ui/sidebar";

interface NavMainProps {
  isAdmin: boolean;
}

/**
 * Menu principal
 */
const ITEMS: NavItem[] = [
  // --- Admin only ---
  {
    id: "client",
    title: "Clients",
    href: "/clients",
    icon: Building2,
    adminOnly: true,
  },
  {
    id: "utilisateur",
    title: "Utilisateurs",
    href: "/utilisateurs",
    icon: Contact,
    adminOnly: true,
  },
  {
    id: "plan_comptable",
    title: "Plan comptable",
    href: "/plan-comptable",
    icon: FileStack,
    adminOnly: true,
  },

  // --- Accessible à tous ---
  {
    id: "fournisseur",
    title: "Fournisseurs",
    href: "/fournisseurs",
    icon: Presentation,
  },
  {
    id: "facture_fournisseur",
    title: "Factures fournisseurs",
    href: "/factures-fournisseurs",
    icon: KeyRound,
  },
  {
    id: "client_facture",
    title: "Factures clients",
    href: "/factures-clients",
    icon: Users,
  },
  {
    id: "operation_bancaire",
    title: "Opérations bancaires",
    href: "/operations-bancaires",
    icon: Settings2,
  },
  {
    id: "exercice_comptable",
    title: "Exercices",
    href: "/exercices",
    icon: Building2,
  },
  {
    id: "todo",
    title: "TODO Liste",
    href: "/todos",
    icon: ListTodo,
  },
];

/**
 * Filtrage selon capacité admin
 */
function filterByAdmin(isAdmin: boolean): NavItem[] {
  return ITEMS.filter(
    (item) => !item.adminOnly || isAdmin
  );
}

export default function NavMain({ isAdmin }: NavMainProps) {
  const items = filterByAdmin(isAdmin);

  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex items-center gap-2 px-2 py-1 text-lg font-bold">
          <KanbanSquare className="h-4 w-4 " />
          {!collapsed && "Opérations"}
        </div>
      </SidebarGroupLabel>

      <SidebarMenuItems items={items} />
    </SidebarGroup>
  );
}
