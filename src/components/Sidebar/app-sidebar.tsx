"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, loading } = useUser();

  function isActive(path: string): boolean {
    return pathname.startsWith(path);
  }

  return (
    <Sidebar className="border-r bg-white dark:bg-neutral-900">
      <SidebarContent>

        {/* --- Utilisateur connecté ------------------------------------------------ */}
        <SidebarGroup>
          <SidebarGroupLabel>Compte</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavUser />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chargement en cours : stop menu */}
        {loading && (
          <SidebarGroup>
            <SidebarGroupLabel>Chargement…</SidebarGroupLabel>
          </SidebarGroup>
        )}

        {/* Si pas de user : stop menu */}
        {!loading && !user && (
          <SidebarGroup>
            <SidebarGroupLabel>Non connecté</SidebarGroupLabel>
          </SidebarGroup>
        )}

        {/* Si user OK → menus */}
        {user && (
          <>
            {/* --- ADMIN SYSTEME --------------------------------------------------- */}
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

            {/* --- ADMIN CLIENT ---------------------------------------------------- */}
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

            {/* --- ADMIN PROJET ---------------------------------------------------- */}
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

            {/* --- UTILISATEUR SIMPLE --------------------------------------------- */}
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

            {/* --- LOGOUT ---------------------------------------------------------- */}
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
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
