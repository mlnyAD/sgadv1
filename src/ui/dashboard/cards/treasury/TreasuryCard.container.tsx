

"use client";

import type { DashboardData } from "@/features/dashboard/dashboard.types";
import type { TreasuryCardModel } from "./treasury.model";
import { TreasuryCardView } from "./TreasuryCard.view";

function selectTreasuryModel(data: DashboardData): TreasuryCardModel {
  return {
    asOf: data.treasury?.asOf ?? "—",
    amountEur: data.treasury?.amountEur ?? 0,
    note: "En attente définition “transaction trésorerie”",
  };
}

export function TreasuryCard(props: { data: DashboardData }) {
  const model = selectTreasuryModel(props.data);
  return <TreasuryCardView model={model} />;
}