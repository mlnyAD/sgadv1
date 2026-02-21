

"use client";

import type { DashboardData } from "@/features/dashboard/dashboard.types";
import type { PurchasesCardModel } from "./purchases.model";
import { PurchasesCardView } from "./PurchasesCard.view";

function selectPurchasesModel(data: DashboardData): PurchasesCardModel {
  return {
    totalBudgetEur: data.purchases.totalBudgetEur ?? 0,
    totalRealizedEur: data.purchases.totalRealizedEur ?? 0,
    hasChart: false,
  };
}

export function PurchasesCard(props: { data: DashboardData }) {
  return <PurchasesCardView model={selectPurchasesModel(props.data)} />;
}