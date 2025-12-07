"use client";

import { useUser } from "@/contexts/UserContext";
import UserIdentity from "@/components/Sidebar/userIdentity";
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOut } from "lucide-react";
import Link from "next/link";

export function NavUser() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton disabled className="opacity-60">
          Chargement utilisateur…
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (!user) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton disabled className="text-red-600">
          Utilisateur non chargé
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <UserIdentity compact />
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" side="bottom" align="end">
          <DropdownMenuItem asChild>
            <Link href="/profile">Mon profil</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <form action="/(auth)/logout" method="POST">
              <button className="flex w-full items-center gap-2 text-red-600">
                <LogOut className="size-4" /> Déconnexion
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
