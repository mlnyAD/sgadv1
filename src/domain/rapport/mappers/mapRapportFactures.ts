

// src/domain/rapport/mappers/mapRapportFactures.ts

import type { DashboardReceivables } from "@/features/dashboard/dashboard.types";
import type { RapportFacturesData } from "../types";

export function mapRapportFactures(
  receivables: DashboardReceivables | null | undefined,
): RapportFacturesData | null {
  if (!receivables) return null;

  return {
    emisesEur: receivables.emittedHt ?? 0,
    payeesEur: receivables.paid ?? 0,
    enAttenteEur: receivables.dueNotLate ?? 0,
    enRetardEur: receivables.dueLate ?? 0,
  };
}