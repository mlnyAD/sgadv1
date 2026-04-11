

"use client";

import type { DashboardData } from "@/features/dashboard/dashboard.types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { TreasuryCard } from "./cards/treasury/TreasuryCard.container";
import { InvoicesCard } from "./cards/invoices/InvoicesCard.container";

import { PurchasesByCostCenterCard } from "./cards/purchasesByCostCenter/PurchasesByCostCenterCard.container";

export function DashboardScreen(props: { data: DashboardData }) {
	const { data } = props;

	return (
		<div className="p-2 space-y-2">
			{/* Header */}
			<div className="flex items-start justify-between gap-4">
				<div className="space-y-1">
					<h1 className="text-xl font-semibold tracking-tight  text-ad-dark">Dashboard</h1>
					<p className="text-sm text-muted-foreground">
						Synthèse de l’exercice courant : {data.exer.exerCode ?? data.exer.exerId} — {data.exer.debut} → {data.exer.fin}</p>
				</div>
				<Badge variant="secondary">Exercice courant</Badge>
			</div>

			<Separator />

			{/* Grid */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

				{/* Trésorerie */}
				<div className="lg:col-span-1">
					<TreasuryCard data={data} />
				</div>

				{/* Répartition des achats (gros bloc) */}
				<div className="lg:col-span-2 lg:row-span-2">
					<PurchasesByCostCenterCard data={data} />
				</div>

				{/* Factures émises */}
				<div className="lg:col-span-1">
					<InvoicesCard data={data} />
				</div>

			</div>
		</div>
	);
}