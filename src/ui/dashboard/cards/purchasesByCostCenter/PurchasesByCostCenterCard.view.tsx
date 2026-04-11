

"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/components/ui/table";

import type { PurchasesByCostCenterCardModel } from "./purchasesByCostCenter.model";
import { eur } from "@/ui/dashboard/format";

export function PurchasesByCostCenterCardView(props: {
	model: PurchasesByCostCenterCardModel;
}) {
	const { rows, totalBudgetEur, totalRealizedEur } = props.model;

	return (
		<Card className="min-w-0 rounded-2xl  bg-slate-50/40 border">
			<CardHeader className="pb-2">
				<CardTitle className="text-base">Répartition des achats</CardTitle>
				<CardDescription>
					Budget vs réalisé (HT) par famille de centres de coût
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="h-80 min-w-0 overflow-y-auto">
					<Table>
						<TableBody>

							{/* Header */}
							<TableRow className="border-b bg-muted/30">
								<TableCell className="font-medium">
									Famille de centre de coût
								</TableCell>
								<TableCell className="text-right font-medium">
									Budget prévisionnel
								</TableCell>
								<TableCell className="text-right font-medium">
									Réalisé à date
								</TableCell>
							</TableRow>

							{/* Rows */}
							{rows.map((row) => (
								<TableRow key={row.familleId}>
									<TableCell>{row.label}</TableCell>
									<TableCell className="text-right tabular-nums">
										{eur(row.budgetEur)} €
									</TableCell>
									<TableCell className="text-right tabular-nums">
										{eur(row.realizedEur)} €
									</TableCell>
								</TableRow>
							))}

							{/* Total */}
							<TableRow className="border-t bg-muted/80 font-semibold sticky bottom-0">
								<TableCell className="text-right">Total</TableCell>
								<TableCell className="text-right tabular-nums">
									{eur(totalBudgetEur)} €
								</TableCell>
								<TableCell className="text-right tabular-nums">
									{eur(totalRealizedEur)} €
								</TableCell>
							</TableRow>

						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}