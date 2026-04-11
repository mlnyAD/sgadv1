

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { eur } from "../../format";
import type { TreasuryCardModel } from "./treasury.model";

export function TreasuryCardView(props: { model: TreasuryCardModel }) {
	const { asOf, soldeGlobalEur, comptes, note, tva } = props.model;

	return (
		<Card className="rounded-2xl lg:col-span-1 bg-slate-50/40">
			<CardHeader className="pb-2">
				<CardTitle className="text-base">Trésorerie</CardTitle>
				<CardDescription>Situation au {asOf}</CardDescription>
			</CardHeader>

			<CardContent className="space-y-3">
				<div>
					<div className="text-xs text-muted-foreground">Solde global</div>
					<div className="text-2xl font-semibold tabular-nums">{eur(soldeGlobalEur)} €</div>
				</div>

				{comptes.length > 0 ? (
					<div className="space-y-2 text-sm">
						{comptes.map((c) => (
							<div key={c.compteId} className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-2 min-w-0">
									<div className="truncate">{c.nom}</div>
									{!c.inclusGlobal ? (
										<Badge variant="secondary" className="shrink-0">
											Hors global
										</Badge>
									) : null}
								</div>
								<div className="font-medium tabular-nums">{eur(c.soldeEur)} €</div>
							</div>
						))}
					</div>
				) : null}

				{tva ? (
					<div className="rounded-md border bg-white/70 p-3 space-y-3">
						<div className="flex items-end justify-between gap-3">
							<div className="text-xs text-muted-foreground">TVA à payer</div>
							<div
								className={`font-medium tabular-nums ${tva.tvaRestanteEur > 0 ? "text-red-600" : "text-green-600"
									}`}
							>
								{eur(tva.tvaRestanteEur)} €
							</div>
						</div>

						<div className="space-y-1 text-sm text-muted-foreground">
							<div className="flex items-center justify-between">
								<span>Collectée</span>
								<span className="tabular-nums">{eur(tva.tvaCollecteeEur)} €</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Déductible</span>
								<span className="tabular-nums">{eur(tva.tvaDeductibleEur)} €</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Déjà payée</span>
								<span className="tabular-nums">{eur(tva.tvaDejaPayeeEur)} €</span>
							</div>
						</div>
					</div>
				) : null}

				{note ? <div className="text-sm text-muted-foreground">({note})</div> : null}
			</CardContent>
		</Card>
	);
}