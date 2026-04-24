"use client";

import {
	Building2,
	KanbanSquare,
	TrendingUp,
	HandCoins,
	Scale,
	TrendingDown,
	Target,
	UserCog,
	Handshake,
	ReceiptText,
	RotateCcw,
	CalendarRange,
	Network,
	Landmark,
	FileDown,
	LayoutDashboard,
	WalletCards,
} from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupLabel,
} from "@/components/ui/sidebar";

import SidebarMenuItems from "./SidebarMenuItems";
import type { NavItem } from "./Types";
import { useSidebar } from "@/components/ui/sidebar";

interface NavMainProps {
	isAdmin: boolean;
	mode: "shared" | "app" | "admin";
}

/**
 * Menu principal
 */
const ITEMS: NavItem[] = [
	// --- Admin only ---
	{
		id: "client",
		title: "Clients",
		href: "/clients",
		icon: Building2,
		adminOnly: true,
	},
	{
		id: "operateur",
		title: "Opérateurs",
		href: "/operateurs",
		icon: UserCog,
		adminOnly: true,
	},
	{
		id: "operclient",
		title: "Opérateurs/Clients",
		href: "/operclients",
		icon: Handshake,
		adminOnly: true,
	},

	// --- Accessible à tous ---
	{
		id: "dashboard",
		title: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		id: "facture_fournisseur",
		title: "Factures fournisseurs",
		href: "/purchases",
		icon: TrendingDown,
	},
	{
		id: "facture_client",
		title: "Factures clients",
		href: "/sales",
		icon: TrendingUp,
	},
	{
		id: "societes",
		title: "Sociétés",
		href: "/societes",
		icon: Building2,
	},
	{
		id: "fisc",
		title: "Fiscalité",
		href: "/fisc",
		icon: ReceiptText,
	},
	{
		id: "rembt",
		title: "Remboursements",
		href: "/rembt",
		icon: RotateCcw,
	},
	{
		id: "treso",
		title: "Trésorerie",
		href: "/treso",
		icon: HandCoins,
	},
	{
		id: "exercice_comptable",
		title: "Exercices",
		href: "/exercices",
		icon: CalendarRange,
	},
	{
		id: "budget",
		title: "Budget",
		href: "/budgets",
		icon: Target,
	},
	{
		id: "bilan",
		title: "Bilan",
		href: "/bilan",
		icon: Scale,
	},
	{
		id: "centres_cout",
		title: "Centres coût",
		href: "/centres-cout",
		icon: Network,
	},
	/*	{
			id: "operation_bancaire",
			title: "Opérations bancaires",
			href: "/wait",
			icon: Settings2,
		},
	*/
	{
		id: "compte",
		title: "Comptes bancaires",
		href: "/comptes",
		icon: Landmark,
	},
	{
		id: "rapport",
		title: "Rapport financier",
		href: "/rapport-financier",
		icon: WalletCards,
	},
	{
		id: "export",
		title: "Exports",
		href: "/exports",
		icon: FileDown,
	},
	/*	{
			id: "todo",
			title: "ToDo Liste",
			href: "/wait",
			icon: ListTodo,
		},
	*/
];

/**
 * Filtrage selon capacité admin
 */
function filterByRole(isAdmin: boolean): NavItem[] {
	return ITEMS.filter((item) =>
		isAdmin ? item.adminOnly === true : item.adminOnly !== true
	);
}

export default function NavMain({ isAdmin, mode }: NavMainProps) {
	void mode;

	//console.log("NavMain isAdmin = ", isAdmin);

	const items = filterByRole(isAdmin);

	const { state } = useSidebar();
	const collapsed = state === "collapsed";

	return (
		<SidebarGroup>
			<SidebarGroupLabel>
				<div className="flex items-center gap-2 px-2 py-1 text-lg font-bold">
					<KanbanSquare className="h-4 w-4 " />
					{!collapsed && "Opérations"}
				</div>
			</SidebarGroupLabel>

			<SidebarMenuItems items={items} />
		</SidebarGroup>
	);
}