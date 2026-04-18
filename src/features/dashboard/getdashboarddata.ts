

// src/features/dashboard/getdashboarddata.ts

import type { DashboardData } from "@/features/dashboard/dashboard.types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { loadCurrentExercise } from "./exercise/currentExercise.data";
import { loadSalesBlock } from "./blocks/sales/sales.data";
import { loadPurchasesBlock } from "./blocks/purchases/purchases.data";
import { loadReceivablesBlock } from "./blocks/receivables/receivables.data";
import { getCurrentClient } from "@/domain/session/current-client";
import { chargerBlocTresoDashboard } from "@/features/treso/chargerBlocTresoDashboard";
import { loadTvaBlock } from "./blocks/tva/tva.data";

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createSupabaseServerClient();

const { current } = await getCurrentClient({
  requireSelected: true,
  next: "/dashboard",
});
const cltId = current?.cltId;
if (!cltId) throw new Error("Client courant introuvable.");

const exer = await loadCurrentExercise(supabase, cltId);

const sales = await loadSalesBlock(supabase, cltId, exer.exerId);
const purchases = await loadPurchasesBlock(supabase, cltId, exer.exerId);
const receivables = await loadReceivablesBlock(supabase, cltId, exer.exerId);

const treasury = await chargerBlocTresoDashboard(supabase, cltId, exer.exerId);
const tva = await loadTvaBlock(supabase, cltId, exer.exerId);

  return {
    exer,
    sales,
    purchases,
    receivables,
    treasury,
    tva,
  };
}