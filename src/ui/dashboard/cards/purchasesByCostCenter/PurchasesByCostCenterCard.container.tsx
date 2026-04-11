

"use client";

import type { DashboardData } from "@/features/dashboard/dashboard.types";
import type { PurchasesByCostCenterCardModel } from "./purchasesByCostCenter.model";
import { PurchasesByCostCenterCardView } from "./PurchasesByCostCenterCard.view";

function selectModel(data: DashboardData): PurchasesByCostCenterCardModel {
  return {
    rows: data.purchases.rows ?? [],
    totalBudgetEur: data.purchases.totalBudgetEur ?? 0,
    totalRealizedEur: data.purchases.totalRealizedEur ?? 0,
  };
}

export function PurchasesByCostCenterCard(props: { data: DashboardData }) {
  return <PurchasesByCostCenterCardView model={selectModel(props.data)} />;
}