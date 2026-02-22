

"use client";

import type { DashboardData } from "@/features/dashboard/dashboard.types";
import type { TreasuryCardModel } from "./treasury.model";
import { TreasuryCardView } from "./TreasuryCard.view";

function selectModel(data: DashboardData): TreasuryCardModel {
  const t = data.treasury;

  if (!t) {
    return {
      asOf: "—",
      soldeGlobalEur: 0,
      comptes: [],
      note: "Trésorerie non initialisée",
    };
  }

  return {
    asOf: t.asOf ?? "—",
    soldeGlobalEur: t.soldeGlobalEur ?? t.amountEur ?? 0,
    comptes: (t.comptes ?? []).map((c) => ({
      compteId: c.compteId,
      nom: c.nom,
      soldeEur: c.soldeEur,
      inclusGlobal: c.inclusGlobal,
    })),
  };
}

export function TreasuryCard(props: { data: DashboardData }) {
  return <TreasuryCardView model={selectModel(props.data)} />;
}