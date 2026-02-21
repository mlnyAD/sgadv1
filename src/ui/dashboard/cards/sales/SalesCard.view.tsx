

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { eur } from "../../format";
import type { SalesCardModel } from "./sales.model";
import { DASHBOARD_COLORS } from "@/ui/dashboard/dashboard.colors";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export function SalesCardView(props: { model: SalesCardModel }) {
  const { totalBudgetEur, totalRealizedEur, byRevenueType } = props.model;

  return (
    <Card className="rounded-2xl lg:col-span-1 bg-slate-50/40">
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

        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byRevenueType}>
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
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}