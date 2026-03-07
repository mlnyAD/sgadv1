

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { eur } from "../../format";
import type { SalesCardModel } from "./sales.model";
import { DASHBOARD_COLORS } from "@/ui/dashboard/dashboard.colors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useElementSize } from "@/hooks/use-element-size";

export function SalesCardView(props: { model: SalesCardModel }) {
  const { totalBudgetEur, totalRealizedEur, byRevenueType } = props.model;
  const { ref, size } = useElementSize<HTMLDivElement>();

  const ready = size.width > 0 && size.height > 0;

  return (
    <Card className="min-w-0 rounded-2xl lg:col-span-1 bg-slate-50/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Ventes</CardTitle>
        <CardDescription>Objectif vs réalisé (HT)</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Objectif</div>
            <div className="text-xl font-semibold tabular-nums">{eur(totalBudgetEur)} €</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Réalisé</div>
            <div className="text-xl font-semibold tabular-nums">{eur(totalRealizedEur)} €</div>
          </div>
        </div>

        <div ref={ref} className="h-44 min-w-0">
          {!ready ? (
            <div className="h-full w-full rounded bg-muted animate-pulse" />
          ) : (
            <BarChart width={size.width} height={size.height} data={byRevenueType}>
              <CartesianGrid stroke={DASHBOARD_COLORS.grid} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: DASHBOARD_COLORS.axis }} />
              <YAxis tick={{ fontSize: 11, fill: DASHBOARD_COLORS.axis }} />
              <Tooltip
                formatter={(value) => {
                  const n = typeof value === "number" ? value : Number(value ?? 0);
                  return `${eur(n)} €`;
                }}
              />
              <Legend />
              <Bar dataKey="budgetEur" name="Budget" fill={DASHBOARD_COLORS.budget} />
              <Bar dataKey="realizedEur" name="Réalisé" fill={DASHBOARD_COLORS.realized} />
            </BarChart>
          )}
        </div>
      </CardContent>
    </Card>
  );
}