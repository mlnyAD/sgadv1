

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { PurchasesByCostCenterCardModel } from "./purchasesByCostCenter.model";
import { DASHBOARD_COLORS } from "@/ui/dashboard/dashboard.colors";
import { eur } from "@/ui/dashboard/format";
import { useElementSize } from "@/hooks/use-element-size";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

type TickProps = {
  x?: number;
  y?: number;
  payload?: { value?: string };
};

function CustomTick(props: TickProps) {
  const x = props.x ?? 0;
  const y = props.y ?? 0;
  const value = props.payload?.value ?? "";

  return (
    <text
      x={x}
      y={y + 15}
      textAnchor="end"
      transform={`rotate(-30, ${x}, ${y})`}
      fontSize={11}
      fill={DASHBOARD_COLORS.axis}
    >
      {value}
    </text>
  );
}

export function PurchasesByCostCenterCardView(props: {
  model: PurchasesByCostCenterCardModel;
}) {
  const { items } = props.model;
  const { ref, size } = useElementSize<HTMLDivElement>();

  const ready = size.width > 0 && size.height > 0;

  return (
    <Card className="min-w-0 rounded-2xl lg:col-span-2 bg-slate-50/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Répartition des achats</CardTitle>
        <CardDescription>
          Budget vs réalisé (HT) par famille de centres de coût
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div ref={ref} className="h-56 min-w-0">
          {!ready ? (
            <div className="h-full w-full rounded bg-muted animate-pulse" />
          ) : (
            <BarChart width={size.width} height={size.height} data={items}>
              <CartesianGrid stroke={DASHBOARD_COLORS.grid} vertical={false} />

              <XAxis dataKey="label" interval={0} height={70} tick={<CustomTick />} />
              <YAxis tick={{ fontSize: 11, fill: DASHBOARD_COLORS.axis }} />

              <Tooltip
                formatter={(value) => {
                  const n = typeof value === "number" ? value : Number(value ?? 0);
                  return `${eur(n)} €`;
                }}
              />
              <Legend />

              <Bar dataKey="budgetEur" name="Budget" fill={DASHBOARD_COLORS.budget} />

              <Bar dataKey="realizedEur" name="Réalisé">
                {items.map((entry, idx) => {
                  const over =
                    (entry.realizedEur ?? 0) > (entry.budgetEur ?? 0) &&
                    (entry.budgetEur ?? 0) > 0;

                  return (
                    <Cell
                      key={`cell-${idx}`}
                      fill={over ? DASHBOARD_COLORS.over : DASHBOARD_COLORS.realized}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          )}
        </div>
      </CardContent>
    </Card>
  );
}