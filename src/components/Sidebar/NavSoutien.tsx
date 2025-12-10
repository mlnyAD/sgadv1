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
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { useSidebar } from "@/components/ui/sidebar";

const ITEMS = [
  { id: "help", title: "Aide en ligne", href: "/support/help", icon: HelpCircle },
  { id: "support", title: "Support", href: "/support", icon: LifeBuoy },
  { id: "chat", title: "Activité chat", href: "/support/chat", icon: MessageCircle },
  { id: "activities", title: "Activités", href: "/support/activities", icon: Activity },
  { id: "biblio", title: "Bibliothèque technique", href: "/support/library", icon: LibraryBig },
  { id: "docs", title: "Documentation Projet", href: "/support/docs", icon: BookOpenText },
];

export default function NavSoutien() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed"; // pour cacher le texte en mode réduit

  return (
    <div className="w-full">
      <Accordion type="single" collapsible defaultValue="">
        <AccordionItem value="soutien">

          {/* TITRE AVEC ICÔNE */}
          <AccordionTrigger className="px-2 py-2 text-sm font-medium">
            <div className="flex items-center gap-2">
              <LifeBuoy className="h-4 w-4" />
              {!collapsed && "Soutien"}
            </div>
          </AccordionTrigger>

          {/* LISTE D’ENTRÉES */}
          <AccordionContent className="pt-1">
            <SidebarMenu className="pl-4">
              {ITEMS.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && item.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </AccordionContent>

        </AccordionItem>
      </Accordion>
    </div>
  );
}
