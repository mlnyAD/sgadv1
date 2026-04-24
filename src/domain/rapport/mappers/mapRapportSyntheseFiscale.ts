

import type { FiscSummary } from "@/domain/fisc/fisc-summary";
import type { RapportSyntheseFiscaleData } from "../types";

export function mapRapportSyntheseFiscale(
  summary: FiscSummary | null,
): RapportSyntheseFiscaleData | null {
  if (!summary) return null;

  return {
    rows: summary.rows,
    totalEur: summary.totalEur,
  };
}