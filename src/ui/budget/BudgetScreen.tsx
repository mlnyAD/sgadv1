

"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export type BudgetExerciseOption = { exer_id: string; exer_code: string | null };

export type SalesRow = {
	budid: string | null;
	revenue_type_id: number;
	detail: string; // "---" | "Trvx" | "Autre"
	budget_ht_eur: number;
	realized_ht_eur: number;
};

export type PurchaseRow = {
	budid: string | null;
	cc_id: string;
	famille: string; // libellé famille
	cc_code: string;
	cc_libelle: string;
	budget_ht_eur: number;
	realized_ht_eur: number;
};

function eur(n: number) {
	return (n ?? 0).toLocaleString("fr-FR", { maximumFractionDigits: 0 });
}

function pct(realized: number, budget: number) {
	if (!budget) return "—";
	return `${Math.round((realized / budget) * 100)}%`;
}

function sum<T>(rows: T[], pick: (r: T) => number) {
	return rows.reduce((acc, r) => acc + (pick(r) ?? 0), 0);
}

function toNumberOrZero(v: string) {
	// accepte "" => 0, "12" => 12, "12,5" => 12.5
	const n = Number(String(v).replace(",", "."));
	return Number.isFinite(n) ? n : 0;
}

export function BudgetScreen(props: {
	title: string;
	subtitle: string;
	exerid: string;
	exerciseOptions: BudgetExerciseOption[];
	onExerChange: (exerid: string) => void;

	salesRows: SalesRow[];
	purchaseRows: PurchaseRow[];

	isSaving: boolean;
	onSave: () => void;
	onChangeSalesBudget: (revenue_type_id: number, value: number) => void;
	onChangePurchaseBudget: (cc_id: string, value: number) => void;
}) {
	const {
		title,
		subtitle,
		exerid,
		exerciseOptions,
		onExerChange,
		salesRows = [],
		purchaseRows = [],
		isSaving,
		onSave,
		onChangeSalesBudget,
		onChangePurchaseBudget,
	} = props;

	// group achats by famille
	const purchaseByFamille = React.useMemo(() => {
		const m = new Map<string, PurchaseRow[]>();
		for (const r of purchaseRows) {
			const key = r.famille || "Autres";
			if (!m.has(key)) m.set(key, []);
			m.get(key)!.push(r);
		}
		// stable ordering: famille name, then cc_code
		return Array.from(m.entries())
			.map(([famille, rows]) => ({
				famille,
				rows: rows
					.slice()
					.sort((a, b) => (a.cc_code || "").localeCompare(b.cc_code || "")),
			}))
			.sort((a, b) => a.famille.localeCompare(b.famille));
	}, [purchaseRows]);

	const salesBudget = sum(salesRows, (r) => r.budget_ht_eur);
	const salesReal = sum(salesRows, (r) => r.realized_ht_eur);

	const purchBudget = sum(purchaseRows, (r) => r.budget_ht_eur);
	const purchReal = sum(purchaseRows, (r) => r.realized_ht_eur);

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="space-y-2">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
						<p className="text-sm text-muted-foreground">{subtitle}</p>
					</div>

					<div className="flex items-center gap-2">
						<div className="w-60">
							<Select value={exerid} onValueChange={onExerChange}>
								<SelectTrigger>
									<SelectValue placeholder="Choisir un exercice" />
								</SelectTrigger>
								<SelectContent>
									{exerciseOptions.map((o) => (
										<SelectItem key={o.exer_id} value={o.exer_id}>
											{o.exer_code ?? o.exer_id}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
        <Link
          href="/dashboard"
          className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
        >
          Fermer
        </Link>
						<Button 
							type="button"
							variant="axcio"
							onClick={onSave} 
							disabled={isSaving}>
							{isSaving ? "Enregistrement..." : "Enregistrer"}
						</Button>

					</div>
				</div>

				<Separator />
			</div>

			{/* CA */}
			<Card className="rounded-2xl">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-base">Chiffre d’affaires prévisionnel (HT)</CardTitle>
							<CardDescription>Budget vs réalisé, par type de revenu</CardDescription>
						</div>
						<Badge variant="secondary">Ventes</Badge>
					</div>
				</CardHeader>

				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50%]">Détail</TableHead>
								<TableHead className="text-right">Montant HT</TableHead>
								<TableHead className="text-right">Réalisé HT</TableHead>
								<TableHead className="text-right">% réalisé</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{salesRows.map((r) => (
								<TableRow key={r.revenue_type_id}>
									<TableCell className="font-medium">{r.detail}</TableCell>

									<TableCell className="text-right">
										<Input
											className="h-8 w-28 text-right tabular-nums"
											inputMode="decimal"
											value={String(r.budget_ht_eur ?? 0)}
											onChange={(e) =>
												onChangeSalesBudget(r.revenue_type_id, toNumberOrZero(e.target.value))
											}
										/>
									</TableCell>

									<TableCell className="text-right tabular-nums">{eur(r.realized_ht_eur)}</TableCell>

									<TableCell className="text-right tabular-nums">
										{pct(r.realized_ht_eur, r.budget_ht_eur)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>

						<TableFooter>
							<TableRow className="bg-gray-200">
								<TableCell className="font-semibold text-right">CA prévisionnel (HT)</TableCell>
								<TableCell className="text-right font-semibold tabular-nums">{eur(salesBudget)}</TableCell>
								<TableCell className="text-right font-semibold tabular-nums">{eur(salesReal)}</TableCell>
								<TableCell className="text-right font-semibold tabular-nums">
									{pct(salesReal, salesBudget)}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</CardContent>
			</Card>

			{/* Achats */}
			<Card className="rounded-2xl">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-base">Achats prévisionnels (HT)</CardTitle>
							<CardDescription>Sous-totaux par famille de centre de coût + total global</CardDescription>
						</div>
						<Badge variant="secondary">Achats</Badge>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[28%]">Famille</TableHead>
								<TableHead className="w-[12%]">Code</TableHead>
								<TableHead>Détail</TableHead>
								<TableHead className="text-right">Montant HT</TableHead>
								<TableHead className="text-right">Réalisé HT</TableHead>
								<TableHead className="text-right">% réalisé</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{purchaseByFamille.map(({ famille, rows }) => {
								const famBudget = sum(rows, (r) => r.budget_ht_eur);
								const famReal = sum(rows, (r) => r.realized_ht_eur);

								return (
									<React.Fragment key={famille}>
										{rows.map((r, idx) => (
											<TableRow key={`${famille}-${r.cc_id}-${idx}`}>
												<TableCell className="align-top">
													{idx === 0 ? <span className="font-medium">{famille}</span> : null}
												</TableCell>

												<TableCell className="tabular-nums">{r.cc_code}</TableCell>

												<TableCell>{[r.cc_code, r.cc_libelle].filter(Boolean).join(" - ")}</TableCell>

												<TableCell className="text-right">
													<Input
														className="h-8 w-28 text-right tabular-nums"
														inputMode="decimal"
														value={String(r.budget_ht_eur ?? 0)}
														onChange={(e) =>
															onChangePurchaseBudget(r.cc_id, toNumberOrZero(e.target.value))
														}
													/>
												</TableCell>

												<TableCell className="text-right tabular-nums">{eur(r.realized_ht_eur)}</TableCell>

												<TableCell className="text-right tabular-nums">
													{pct(r.realized_ht_eur, r.budget_ht_eur)}
												</TableCell>
											</TableRow>
										))}

										{/* Sous-total famille */}
										<TableRow className="bg-muted/40">
											<TableCell />
											<TableCell />
											<TableCell className="text-right italic">{`S/Total ${famille} (HT)`}</TableCell>
											<TableCell className="text-right font-semibold tabular-nums">{eur(famBudget)}</TableCell>
											<TableCell className="text-right font-semibold tabular-nums">{eur(famReal)}</TableCell>
											<TableCell className="text-right font-semibold tabular-nums">{pct(famReal, famBudget)}</TableCell>
										</TableRow>
									</React.Fragment>
								);
							})}
						</TableBody>

						<TableFooter>
							<TableRow className="bg-gray-200">
								<TableCell />
								<TableCell />
								<TableCell className="text-right font-semibold">Total des charges (HT)</TableCell>
								<TableCell className="text-right font-semibold tabular-nums">{eur(purchBudget)}</TableCell>
								<TableCell className="text-right font-semibold tabular-nums">{eur(purchReal)}</TableCell>
								<TableCell className="text-right font-semibold tabular-nums">
									{pct(purchReal, purchBudget)}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}