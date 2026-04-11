

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { addRemboursementAction, deleteRemboursementAction } from "@/features/rembt/rembt.actions";
import { Textarea } from "@/components/ui/textarea";

export type RembtExerciseOption = { exer_id: string; exer_code: string | null };

export type RembtRow = {
	rbt_id: string;
	rbt_date: string;
	rbt_amount: number;
	rbt_commentaires: string;
};

function eur(n: number) {
	return (n ?? 0).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function toNumberOrZero(v: string) {
	const n = Number(String(v).replace(",", "."));
	return Number.isFinite(n) ? n : 0;
}

export function RembtScreenClient(props: {
	exerid: string;
	exerciseOptions: RembtExerciseOption[];
	state: { toRefundAmount: number; refundedAmount: number; remainingAmount: number; exerCode: string | null };
	rows: RembtRow[];
}) {
	const { exerid, exerciseOptions, state, rows } = props;
	const router = useRouter();

	const [amount, setAmount] = React.useState<number>(0);
	const [date, setDate] = React.useState<string>(() => new Date().toISOString().slice(0, 10));

	const onExerChange = (nextExerId: string) => {
		router.push(`/rembt?exerid=${encodeURIComponent(nextExerId)}`);
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="space-y-2">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight">
							État des remboursements — Exercice {state.exerCode ?? exerid}
						</h1>
						<p className="text-sm text-muted-foreground">
							Montant à rembourser = somme des parts payées par un tiers (achats)
						</p>
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
					</div>
				</div>

				<Separator />
			</div>

			{/* KPIs */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card className="rounded-2xl bg-gray-200">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm">Montant à rembourser</CardTitle>
					</CardHeader>
					<CardContent className="text-2xl font-semibold">{eur(state.toRefundAmount)}</CardContent>
				</Card>

				<Card className="rounded-2xl bg-gray-200">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm">Remboursé</CardTitle>
					</CardHeader>
					<CardContent className="text-2xl font-semibold">{eur(state.refundedAmount)}</CardContent>
				</Card>

				<Card className="rounded-2xl bg-amber-100">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm">Reste à rembourser</CardTitle>
					</CardHeader>
					<CardContent className="text-2xl font-semibold">{eur(state.remainingAmount)}</CardContent>
				</Card>
			</div>

			{/* Ajout */}
			<Card className="rounded-2xl">
				<CardHeader className="pb-3">
					<CardTitle className="text-base">Ajouter un remboursement</CardTitle>
				</CardHeader>
				<CardContent>
					<form action={addRemboursementAction} className="grid gap-4 md:grid-cols-4 items-end">
						<input type="hidden" name="exerId" value={exerid} />

						<div className="grid gap-2 bg-green-50 dark:text-black rounded-xl">
							<Label htmlFor="date">Date</Label>
							<Input
								id="date"
								name="date"
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								required
							/>
						</div>

						<div className="grid gap-2 bg-green-50 dark:text-black rounded-xl">
							<Label htmlFor="amount">Montant</Label>
							<Input
								id="amount"
								name="amount"
								type="text"
								inputMode="decimal"
								value={String(amount)}
								onChange={(e) => setAmount(toNumberOrZero(e.target.value))}
								required
							/>
						</div>
						<div className="md:col-span-2 grid gap-2  bg-green-50 dark:text-black rounded-xl">
							<Label htmlFor="commentaires">Commentaires</Label>
							<Textarea
								id="commentaires"
								name="commentaires"
								placeholder="Ex: Virement du 12/03, référence banque..."
								rows={2}
							/>
						</div>

						<div className="md:col-span-2 flex items-center gap-2">
							<Button type="submit" variant="axcio">
								Enregistrer
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			{/* Liste */}
			<Card className="rounded-2xl">
				<CardHeader className="pb-3">
					<CardTitle className="text-base">Remboursements faits</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-40">Date</TableHead>
								<TableHead>Commentaires</TableHead>								
								<TableHead className="text-right">Montant</TableHead>

								<TableHead className="w-[140px] text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.length === 0 ? (
								<TableRow>
									<TableCell colSpan={3} className="text-sm text-muted-foreground">
										Aucun remboursement.
									</TableCell>
								</TableRow>
							) : (
								rows.map((r) => (
									<TableRow key={r.rbt_id}>
										<TableCell>{r.rbt_date}</TableCell>
										<TableCell className="max-w-[480px] truncate" title={r.rbt_commentaires}>
											{r.rbt_commentaires}
										</TableCell>
										<TableCell className="text-right tabular-nums">{eur(r.rbt_amount)}</TableCell>
										<TableCell className="text-right">
											<form action={deleteRemboursementAction}>
												<input type="hidden" name="exerId" value={exerid} />
												<input type="hidden" name="rbtId" value={r.rbt_id} />
												<Button type="submit" variant="destructive" size="sm">
													Supprimer
												</Button>
											</form>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}