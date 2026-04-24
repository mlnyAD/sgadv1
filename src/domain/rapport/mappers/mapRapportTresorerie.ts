

// src/domain/rapport/mappers/mapRapportTresorerie.ts

import type {
  DashboardTreasury,
  DashboardTva,
} from "@/features/dashboard/dashboard.types";
import type { RapportTresorerieData } from "../types";

export function mapRapportTresorerie(params: {
  treasury: DashboardTreasury | null | undefined;
  tva?: DashboardTva | null;
}): RapportTresorerieData | null {
  const { treasury, tva } = params;

  if (!treasury) return null;

  return {
    asOf: treasury.asOf,
    soldeGlobalEur: treasury.soldeGlobalEur,
    comptes: treasury.comptes ?? [],
    tva: tva
      ? {
          tvaCollecteeEur: tva.tvaCollecteeEur,
          tvaDeductibleEur: tva.tvaDeductibleEur,
          tvaDejaPayeeEur: tva.tvaDejaPayeeEur,
          tvaRestanteEur: tva.tvaRestanteEur,
        }
      : undefined,
  };
}