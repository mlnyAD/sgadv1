"use client";

import {
  Building2,
  Contact,
  FileStack,
  ListTodo,
  Settings2,
  Presentation,
  KanbanSquare,
  ShoppingCart,
  TrendingUp,
  BadgeEuro,
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
    id: "operateur",
    title: "Opérateurs",
    href: "/operateurs",
    icon: Contact,
    adminOnly: true,
  },
  {
    id: "operclient",
    title: "Opérateurs/Clients",
    href: "/operclients",
    icon: Contact,
    adminOnly: true,
  },

  // --- Accessible à tous ---
  {
    id: "centres_cout",
    title: "Centres coût",
    href: "/centres-cout",
    icon: FileStack,
  },
  {
    id: "societes",
    title: "Sociétés",
    href: "/societes",
    icon: Presentation,
  },
  {
    id: "facture_fournisseur",
    title: "Achats",
    href: "/invoices/purchase",
    icon: ShoppingCart,
  },
  {
    id: "facture_client",
    title: "Ventes",
    href: "/invoices/sales",
    icon: TrendingUp,
  },
  {
    id: "budget",
    title: "Budget",
    href: "/budgets",
    icon: BadgeEuro,
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
function filterByRole(isAdmin: boolean): NavItem[] {
  return ITEMS.filter((item) =>
    isAdmin ? item.adminOnly === true : item.adminOnly !== true
  );
}

export default function NavMain({ isAdmin }: NavMainProps) {

  //console.log("NavMain isAdmin = ", isAdmin);

  const items = filterByRole(isAdmin);

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