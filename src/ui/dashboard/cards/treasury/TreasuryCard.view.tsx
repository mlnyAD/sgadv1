

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { eur } from "../../format";
import type { TreasuryCardModel } from "./treasury.model";

export function TreasuryCardView(props: { model: TreasuryCardModel }) {
  const { asOf, soldeGlobalEur, comptes, note } = props.model;

  return (
    <Card className="rounded-2xl lg:col-span-1 bg-slate-50/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Trésorerie</CardTitle>
        <CardDescription>Situation à date</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-xs text-muted-foreground">Situation au {asOf}</div>

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

        {note ? <div className="text-sm text-muted-foreground">({note})</div> : null}
      </CardContent>
    </Card>
  );
}