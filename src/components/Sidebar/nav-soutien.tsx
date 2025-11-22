// src/components/Sidebar/nav-soutien.tsx
"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type SupportItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export function NavSoutien({ supports }: { supports: SupportItem[] }) {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupLabel>Soutien</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {supports.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="rounded-md hover:bg-gray-300"
                asChild
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
