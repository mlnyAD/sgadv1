

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { eur } from "../../format";
import type { PurchasesCardModel } from "./purchases.model";

export function PurchasesCardView(props: { model: PurchasesCardModel }) {
  const { totalBudgetEur, totalRealizedEur } = props.model;

  return (
    <Card className="rounded-2xl lg:col-span-1 bg-slate-50/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Achats</CardTitle>
        <CardDescription>Prévu vs consommé (HT)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Prévu</div>
            <div className="text-xl font-semibold tabular-nums">{eur(totalBudgetEur)} €</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Consommé</div>
            <div className="text-xl font-semibold tabular-nums">{eur(totalRealizedEur)} €</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}