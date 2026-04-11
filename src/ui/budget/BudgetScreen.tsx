

"use client";

import * as React from "react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

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

function resteAFaire(realized: number, budget: number) {
	return (budget ?? 0) - (realized ?? 0);
}

function resteClassName(realized: number, budget: number) {
	return resteAFaire(realized, budget) < 0 ? "text-red-600 font-semibold" : "";
}

function sum<T>(rows: T[], pick: (r: T) => number) {
	return rows.reduce((acc, r) => acc + (pick(r) ?? 0), 0);
}

function toNumberOrZero(v: string) {
	const n = Number(String(v).replace(",", "."));
	return Number.isFinite(n) ? n : 0;
}

const GRID_PURCHASE = "grid-cols-[28%_12%_1fr_140px_140px_140px]";
const GRID_SALES = "grid-cols-[28%_12%_1fr_140px_140px_140px]";

function LeftChevronTrigger(props: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<AccordionTrigger
			className={[
				"px-4 hover:no-underline",
				"[&>svg]:order-first [&>svg]:mr-3 [&>svg]:ml-0",
				props.className ?? "",
			].join(" ")}
		>
			<div className="w-full">{props.children}</div>
		</AccordionTrigger>
	);
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

	const salesByType = React.useMemo(() => {
		return salesRows.map((r) => ({
			key: String(r.revenue_type_id),
			label: r.detail,
			rows: [r],
		}));
	}, [salesRows]);

	const purchaseByFamille = React.useMemo(() => {
		const m = new Map<string, PurchaseRow[]>();

		for (const r of purchaseRows) {
			const key = r.famille || "Autres";
			if (!m.has(key)) m.set(key, []);
			m.get(key)!.push(r);
		}

		return Array.from(m.entries())
			.map(([famille, rows]) => ({
				famille,
				rows: rows
					.slice()
					.sort((a, b) => (a.cc_code || "").localeCompare(b.cc_code || "")),
			}))
			.sort((a, b) => a.famille.localeCompare(b.famille));
	}, [purchaseRows]);

	const allSalesKeys = React.useMemo(
		() => salesByType.map((g) => g.key),
		[salesByType]
	);

	const allPurchaseKeys = React.useMemo(
		() => purchaseByFamille.map((g) => g.famille),
		[purchaseByFamille]
	);

	// Tout fermé par défaut
	const [openSales, setOpenSales] = React.useState<string[]>([]);
	const [openPurchases, setOpenPurchases] = React.useState<string[]>([]);

	const salesBudget = sum(salesRows, (r) => r.budget_ht_eur);
	const salesReal = sum(salesRows, (r) => r.realized_ht_eur);

	const purchBudget = sum(purchaseRows, (r) => r.budget_ht_eur);
	const purchReal = sum(purchaseRows, (r) => r.realized_ht_eur);

	return (
		<div className="space-y-6 p-6">
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
							className="inline-flex h-9 items-center rounded-md border border-muted-foreground/40 px-4 text-base text-foreground hover:bg-muted"
						>
							Fermer
						</Link>

						<Button
							type="button"
							variant="axcio"
							onClick={onSave}
							disabled={isSaving}
						>
							{isSaving ? "Enregistrement..." : "Enregistrer"}
						</Button>
					</div>
				</div>

				<Separator />
			</div>

			{/* VENTES */}
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

				<CardContent className="space-y-4">
					<div className="flex items-center justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => setOpenSales(allSalesKeys)}
						>
							Tout ouvrir
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => setOpenSales([])}
						>
							Tout fermer
						</Button>
					</div>

					<div className="rounded-md border">
						<div className={`grid ${GRID_SALES} border-b bg-muted/40 px-4 py-2 text-sm font-medium`}>
							<div>Détail</div>
							<div />
							<div />
							<div className="text-right">Montant HT</div>
							<div className="text-right">Réalisé HT</div>
							<div className="text-right">Reste à faire</div>
						</div>

						<Accordion
							type="multiple"
							value={openSales}
							onValueChange={setOpenSales}
							className="w-full"
						>
							{salesByType.map(({ key, label, rows }) => {
								const row = rows[0];
								const budget = row?.budget_ht_eur ?? 0;
								const realized = row?.realized_ht_eur ?? 0;

								return (
									<AccordionItem key={key} value={key}>
										<LeftChevronTrigger>
											<div className={`grid ${GRID_SALES} items-center text-sm`}>
												<div className="text-left font-medium">{label}</div>
												<div />
												<div />
												<div className="text-right tabular-nums font-semibold">{eur(budget)}</div>
												<div className="text-right tabular-nums font-semibold">{eur(realized)}</div>
												<div className={`text-right tabular-nums font-semibold ${resteClassName(realized, budget)}`}>
													{eur(resteAFaire(realized, budget))}
												</div>
											</div>
										</LeftChevronTrigger>

										<AccordionContent className="px-4 pb-2">
											<div className={`grid ${GRID_SALES} items-center py-1 text-sm`}>
												<div>{label}</div>
												<div />
												<div />

												<div className="flex justify-end">
													<Input
														className="h-8 w-28 bg-green-50 text-right tabular-nums"
														inputMode="decimal"
														value={String(budget)}
														onChange={(e) =>
															onChangeSalesBudget(
																row.revenue_type_id,
																toNumberOrZero(e.target.value)
															)
														}
													/>
												</div>

												<div className="rounded bg-gray-100 px-2 py-1 text-right tabular-nums">
													{eur(realized)}
												</div>

												<div className={`rounded bg-blue-50 px-2 py-1 text-right tabular-nums ${resteClassName(realized, budget)}`}>
													{eur(resteAFaire(realized, budget))}
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								);
							})}
						</Accordion>

						<div className={`grid ${GRID_SALES} items-center border-t bg-gray-100 px-4 py-3 text-sm font-semibold`}>
							<div />
							<div />
							<div className="text-right">CA prévisionnel (HT)</div>
							<div className="text-right tabular-nums">{eur(salesBudget)}</div>
							<div className="text-right tabular-nums">{eur(salesReal)}</div>
							<div className={`text-right tabular-nums ${resteClassName(salesReal, salesBudget)}`}>
								{eur(resteAFaire(salesReal, salesBudget))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* ACHATS */}
			<Card className="rounded-2xl border-slate-200 bg-slate-50/50">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-base">Achats prévisionnels (HT)</CardTitle>
							<CardDescription>
								Sous-totaux par famille de centre de coût + total global
							</CardDescription>
						</div>
						<Badge variant="secondary">Achats</Badge>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="flex items-center justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => setOpenPurchases(allPurchaseKeys)}
						>
							Tout ouvrir
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => setOpenPurchases([])}
						>
							Tout fermer
						</Button>
					</div>

					<div className="rounded-md border bg-white">
						<div className={`grid ${GRID_PURCHASE} border-b bg-muted/40 px-4 py-2 text-sm font-medium`}>
							<div>Famille</div>
							<div>Code</div>
							<div>Détail</div>
							<div className="text-right">Montant HT</div>
							<div className="text-right">Réalisé HT</div>
							<div className="text-right">Reste à faire</div>
						</div>

						<Accordion
							type="multiple"
							value={openPurchases}
							onValueChange={setOpenPurchases}
							className="w-full"
						>
							{purchaseByFamille.map(({ famille, rows }) => {
								const famBudget = sum(rows, (r) => r.budget_ht_eur);
								const famReal = sum(rows, (r) => r.realized_ht_eur);

								return (
									<AccordionItem key={famille} value={famille}>
										<LeftChevronTrigger>
											<div className={`grid ${GRID_PURCHASE} items-center text-sm`}>
												<div className="text-left font-medium">{famille}</div>
												<div />
												<div className="text-left text-muted-foreground">
													{rows.length} centre{rows.length > 1 ? "s" : ""} de coût
												</div>
												<div className="text-right tabular-nums font-semibold">{eur(famBudget)}</div>
												<div className="text-right tabular-nums font-semibold">{eur(famReal)}</div>
												<div className={`text-right tabular-nums font-semibold ${resteClassName(famReal, famBudget)}`}>
													{eur(resteAFaire(famReal, famBudget))}
												</div>
											</div>
										</LeftChevronTrigger>

										<AccordionContent className="px-4 pb-2">
											<div className="space-y-1">
												{rows.map((r) => (
													<div
														key={`${famille}-${r.cc_id}`}
														className={`grid ${GRID_PURCHASE} items-center py-1 text-sm`}
													>
														<div />
														<div className="tabular-nums">{r.cc_code}</div>
														<div>{r.cc_libelle}</div>

														<div className="flex justify-end">
															<Input
																className="h-8 w-28 bg-green-50 text-right tabular-nums"
																inputMode="decimal"
																value={String(r.budget_ht_eur ?? 0)}
																onChange={(e) =>
																	onChangePurchaseBudget(
																		r.cc_id,
																		toNumberOrZero(e.target.value)
																	)
																}
															/>
														</div>

														<div className="rounded bg-gray-100 px-2 py-1 text-right tabular-nums">
															{eur(r.realized_ht_eur)}
														</div>

														<div className={`rounded bg-blue-100 px-2 py-1 text-right tabular-nums ${resteClassName(r.realized_ht_eur, r.budget_ht_eur)}`}>
															{eur(resteAFaire(r.realized_ht_eur, r.budget_ht_eur))}
														</div>
													</div>
												))}
											</div>
										</AccordionContent>
									</AccordionItem>
								);
							})}
						</Accordion>

						<div className={`grid ${GRID_PURCHASE} items-center border-t bg-gray-200 px-4 py-3 text-sm font-semibold`}>
							<div />
							<div />
							<div className="text-right">Total des charges (HT)</div>
							<div className="text-right tabular-nums">{eur(purchBudget)}</div>
							<div className="text-right tabular-nums">{eur(purchReal)}</div>
							<div className={`text-right tabular-nums ${resteClassName(purchReal, purchBudget)}`}>
								{eur(resteAFaire(purchReal, purchBudget))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}