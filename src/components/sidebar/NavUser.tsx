"use client";

import { useOperateur } from "@/contexts/OperateurContext";
import UserIdentity from "@/components/sidebar/SidebarUserIdentity";
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

export default function NavUser() {

	const { operateur, loading } = useOperateur();

	if (loading) {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton disabled className="opacity-60">
					Chargement utilisateur…
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	}

	if (!operateur) {
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
				{/* ❗ IMPORTANT : asChild DOIT avoir EXACTEMENT UN enfant */}
				<DropdownMenuTrigger asChild>
					<SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
						<UserIdentity compact={false} />
						<ChevronsUpDown className="ml-auto size-4" />
					</SidebarMenuButton>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56" side="bottom" align="end">

					{/* ✔ un seul enfant : Link */}
					<DropdownMenuItem asChild>
						<Link href="/profile">Mon profil</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href="/about">About</Link>
					</DropdownMenuItem>

					{/* ✔ un seul enfant : button, pas form */}
					<DropdownMenuItem asChild>
						<a href="/logout" className="flex w-full items-center gap-2 text-red-600">
							<LogOut className="size-4" />
							Déconnexion
						</a>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</SidebarMenuItem>
	);
}
