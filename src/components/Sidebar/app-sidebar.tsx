"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { useUser } from "@/contexts/UserContext";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, loading } = useUser();

  function isActive(path: string): boolean {
    return pathname.startsWith(path);
  }

  // Pend le suspense si user est en cours de chargement
  if (loading || !user) {
    return (
      <Sidebar className="border-r bg-white dark:bg-neutral-900">
        <SidebarContent>
          <SidebarGroupLabel>Chargement…</SidebarGroupLabel>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="border-r bg-white dark:bg-neutral-900">
      <SidebarContent>

        {/* --- SECTION : Utilisateur connecté -------------------------------------------- */}
        <SidebarGroup>
          <SidebarGroupLabel>Profil</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem className="font-semibold px-3 py-2">
              {user.displayName || user.email}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/profile" className={isActive("/profile") ? "font-bold" : ""}>
                Mon profil
              </Link>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* --- MENU MINIMAL SI AUCUN PROJET ---------------------------------------------- */}
        {user.projectIds.length === 0 && !user.isSystemAdmin && !user.isClientAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Options</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <form action="/(auth)/logout" method="POST">
                  <button className="text-red-600 hover:underline">Déconnexion</button>
                </form>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* --- ADMIN SYSTEME ------------------------------------------------------------- */}
        {user.isSystemAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration système</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenuItem>
                <Link href="/clients" className={isActive("/clients") ? "font-bold" : ""}>
                  Gestion des clients
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/users" className={isActive("/users") ? "font-bold" : ""}>
                  Gestion des utilisateurs
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/configs" className={isActive("/configs") ? "font-bold" : ""}>
                  Configurations
                </Link>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* --- ADMIN CLIENT -------------------------------------------------------------- */}
        {user.isClientAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration client</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <Link href="/projects" className={isActive("/projects") ? "font-bold" : ""}>
                  Projets
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/budget" className={isActive("/budget") ? "font-bold" : ""}>
                  Budget
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/documents" className={isActive("/documents") ? "font-bold" : ""}>
                  Documentation
                </Link>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* --- ADMIN PROJET -------------------------------------------------------------- */}
        {user.isProjectAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration projet</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenuItem>
                <Link href="/projects" className={isActive("/projects") ? "font-bold" : ""}>
                  Mes projets
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/tasks" className={isActive("/tasks") ? "font-bold" : ""}>
                  Tâches / Planning
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/meetings" className={isActive("/meetings") ? "font-bold" : ""}>
                  Réunions
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/documents" className={isActive("/documents") ? "font-bold" : ""}>
                  Documents
                </Link>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* --- UTILISATEUR --------------------------------------------------------------- */}
        {user.isUser && (
          <SidebarGroup>
            <SidebarGroupLabel>Projet</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenuItem>
                <Link href="/projects" className={isActive("/projects") ? "font-bold" : ""}>
                  Mes projets
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/reporting" className={isActive("/reporting") ? "font-bold" : ""}>
                  Reporting
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/documents" className={isActive("/documents") ? "font-bold" : ""}>
                  Documents
                </Link>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* --- LOGOUT --------------------------------------------------------------------- */}
        <SidebarGroup>
          <SidebarGroupLabel>Session</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <form action="/(auth)/logout" method="POST">
                <button className="text-red-600 hover:underline">Déconnexion</button>
              </form>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}
