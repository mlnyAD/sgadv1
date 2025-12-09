"use client";

import { useUser } from "@/contexts/UserContext";
import UserIdentity from "./userIdentity";

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

import { ChevronsUpDown, LogOut, User2 } from "lucide-react";
import Link from "next/link";

export default function NavUser() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton disabled className="opacity-60">
          Chargement…
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (!user) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton disabled>
          Utilisateur non disponible
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="flex items-center gap-2">
            <UserIdentity />
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" side="top" align="end">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2">
              <User2 className="size-4" /> Mon compte
            </Link>
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
