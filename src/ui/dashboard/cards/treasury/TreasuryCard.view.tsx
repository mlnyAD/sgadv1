

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { eur } from "../../format";
import type { TreasuryCardModel } from "./treasury.model";

export function TreasuryCardView(props: { model: TreasuryCardModel }) {
  const { asOf, amountEur, note } = props.model;

  return (
   <Card className="rounded-2xl lg:col-span-1 bg-slate-50/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Trésorerie</CardTitle>
        <CardDescription>Situation à date</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-xs text-muted-foreground">Situation au {asOf}</div>
        <div className="text-2xl font-semibold tabular-nums">{eur(amountEur)} €</div>
        {note ? <div className="text-sm text-muted-foreground">({note})</div> : null}
      </CardContent>
    </Card>
  );
}