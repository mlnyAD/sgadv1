

// src/domain/rapport/services/getRapportBilanFinancier.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { loadSalesTotals, loadPurchaseTotals } from "@/features/bilan/bilan.data";
import { computeBilan } from "@/domain/bilan/bilan.calculations";
import type { RapportBilanFinancierData } from "../types";

export async function getRapportBilanFinancier(params: {
  cltId: string;
  exerId: string;
}): Promise<RapportBilanFinancierData | null> {
  const supabase = await createSupabaseServerReadClient();

  const [sales, purchases] = await Promise.all([
    loadSalesTotals(supabase, { cltId: params.cltId, exerId: params.exerId }),
    loadPurchaseTotals(supabase, { cltId: params.cltId, exerId: params.exerId }),
  ]);

  const budget = computeBilan({
    caHt: sales.totalBudgetEur,
    chargesHt: purchases.totalBudgetEur,
  });

  const toDate = computeBilan({
    caHt: sales.totalRealizedEur,
    chargesHt: purchases.totalRealizedEur,
  });

  return {
    rows: [
      {
        indicateur: "Chiffre d’affaires HT",
        budgetEur: budget.caHt,
        toDateEur: toDate.caHt,
      },
      {
        indicateur: "Charges HT",
        budgetEur: budget.chargesHt,
        toDateEur: toDate.chargesHt,
      },
      {
        indicateur: "Résultat d’exploitation",
        budgetEur: budget.rex,
        toDateEur: toDate.rex,
      },
      {
        indicateur: "Impôt",
        budgetEur: budget.impot,
        toDateEur: toDate.impot,
      },
      {
        indicateur: "Résultat net",
        budgetEur: budget.resultatNet,
        toDateEur: toDate.resultatNet,
      },
      {
        indicateur: "Réserve légale",
        budgetEur: budget.reserveLegale,
        toDateEur: toDate.reserveLegale,
      },
      {
        indicateur: "Bénéfices nets",
        budgetEur: budget.beneficesNets,
        toDateEur: toDate.beneficesNets,
      },
    ],
  };
}