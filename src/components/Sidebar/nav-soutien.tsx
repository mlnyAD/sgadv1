"use client";

import {
  HelpCircle,
  LifeBuoy,
  MessageCircle,
  Activity,
  LibraryBig,
  BookOpenText,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import SidebarMenuItems from "./SidebarMenuItems";
import type { NavItem } from "./types";

const ITEMS: NavItem[] = [
  { id: "help", title: "Aide en ligne", href: "/support/help", icon: HelpCircle },
  { id: "support", title: "Support", href: "/support", icon: LifeBuoy },
  { id: "chat", title: "Activité chat", href: "/support/chat", icon: MessageCircle },
  { id: "activities", title: "Activités", href: "/support/activities", icon: Activity },
  { id: "biblio", title: "Bibliothèque technique", href: "/support/library", icon: LibraryBig },
  { id: "docs", title: "Documentation Projet", href: "/support/docs", icon: BookOpenText },
];

export default function NavSoutien() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Soutien</SidebarGroupLabel>
      <SidebarMenuItems items={ITEMS} />
    </SidebarGroup>
  );
}
