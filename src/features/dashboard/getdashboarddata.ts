

// src/features/dashboard/getdashboarddata.ts

import type { DashboardData } from "@/features/dashboard/dashboard.types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { loadCurrentExercise } from "./exercise/currentExercise.data";
import { loadSalesBlock } from "./blocks/sales/sales.data";
import { loadPurchasesBlock } from "./blocks/purchases/purchases.data";
import { loadReceivablesBlock } from "./blocks/receivables/receivables.data";

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createSupabaseServerClient();

  // Exercice courant (vw_exercice_view)
  const exer = await loadCurrentExercise(supabase);

  // Ventes (vw_invoice_sales_view + vw_budget_sales_lines)
  const sales = await loadSalesBlock(supabase, exer.exerId);

  const purchases = await loadPurchasesBlock(supabase, exer.exerId);

  const receivables = await loadReceivablesBlock(supabase, exer.exerId);

  // TODO: remplacer ensuite par les vrais loaders purchases/receivables
  return {
    exer,
    sales,
    purchases,
    receivables,
    treasury: {
      asOf: new Date().toISOString().slice(0, 10),
      amountEur: 0,
    },
  };
}