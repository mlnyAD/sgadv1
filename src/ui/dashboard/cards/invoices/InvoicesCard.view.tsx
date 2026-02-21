

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Row } from "../../shared/Row";
import { eur } from "../../format";
import type { InvoicesCardModel } from "./invoices.model";

export function InvoicesCardView(props: { model: InvoicesCardModel }) {
  const m = props.model;
  const hasLate = m.dueLate > 0;

  return (
    <Card
      className={`rounded-2xl lg:col-span-1 ${
        hasLate
          ? "bg-red-50 border-red-200"
          : "bg-slate-50/40"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Factures émises</CardTitle>
        <CardDescription>HT, paiement, retard</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <Row label="Total émises (HT)" value={`${eur(m.emittedHt)} €`} />
        <Row label="Payées" value={`${eur(m.paid)} €`} />
        <Row
          label="En attente (non en retard)"
          value={`${eur(m.dueNotLate)} €`}
        />

        {/* Ligne En retard */}
        <div className="flex items-center justify-between gap-4">
          <div className={hasLate ? "text-red-700 font-medium" : "text-muted-foreground"}>
            En retard
          </div>
          <div
            className={`tabular-nums ${
              hasLate
                ? "text-red-700 font-semibold"
                : "font-medium"
            }`}
          >
            {eur(m.dueLate)} €
          </div>
        </div>

        {/* Badge discret si retard */}
        {hasLate && (
          <div className="text-xs text-red-700">
            ⚠ Retard de paiement
          </div>
        )}
      </CardContent>
    </Card>
  );
}