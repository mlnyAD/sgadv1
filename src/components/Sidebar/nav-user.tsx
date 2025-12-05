"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  SearchX,
  UserIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import UserIdentity from "@/components/Sidebar/userIdentity";

export default function NavUser() {
  const { isMobile } = useSidebar();
  const user = useUser(); // ≈ AuthenticatedUser

  return (
    <SidebarMenu className="border-t border-gray-200">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserIdentity user={user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserIdentity user={user} />
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/account">
                  <UserIcon />
                  <span className="ml-2">Mon compte</span>
                </Link>
              </DropdownMenuItem>

              {user.isClientAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/orderLicence/orderLicenceAdd">
                    <CreditCard />
                    <span className="ml-2">Commandes licences</span>
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild>
                <Link href="/about">
                  <SearchX />
                  <span className="ml-2">À propos…</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Bell />
                <span className="ml-2">Notifications à venir…</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <form action="/(auth)/logout" method="POST">
                <button className="flex items-center">
                  <LogOut />
                  <span className="ml-2">Déconnexion</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
