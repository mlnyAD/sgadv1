"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import type { NavItem } from "./Types";

export default function SidebarMenuItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarMenu>
      {items.map((item) => {
        const active = pathname.startsWith(item.href);

        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              className={cn(
                "flex items-center gap-2 transition-all duration-300 ease-in-out",
                active
                  ? "bg-ad-light text-white hover:bg-ad-dark"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Link href={item.href}>
                <item.icon className="size-5 shrink-0" />

                {!collapsed && (
                  <span
  className={cn(
    "transition-opacity duration-300",
    collapsed ? "opacity-0 hidden" : "opacity-100"
  )}
>
  {item.title}
</span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
