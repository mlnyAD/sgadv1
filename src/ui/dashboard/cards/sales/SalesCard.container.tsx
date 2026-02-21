

"use client";

import type { DashboardData } from "@/features/dashboard/dashboard.types";
import type { SalesCardModel } from "./sales.model";
import { SalesCardView } from "./SalesCard.view";

function selectSalesModel(data: DashboardData): SalesCardModel {
  return {
    totalBudgetEur: data.sales.totalBudgetEur ?? 0,
    totalRealizedEur: data.sales.totalRealizedEur ?? 0,
    byRevenueType: data.sales.byRevenueType ?? [],
  };
}

export function SalesCard(props: { data: DashboardData }) {
  return <SalesCardView model={selectSalesModel(props.data)} />;
}