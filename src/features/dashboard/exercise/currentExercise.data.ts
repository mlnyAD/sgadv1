

// src/features/dashboard/exercise/currentExercise.data.ts

import type { SupabaseClient } from "@supabase/supabase-js";

export async function loadCurrentExercise(supabase: SupabaseClient) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const { data, error } = await supabase
    .from("vw_exercice_view")
    .select("exer_id, exer_code, exer_debut, exer_fin")
    .lte("exer_debut", today)
    .gte("exer_fin", today)
    .order("exer_debut", { ascending: false })
    .limit(1);

  if (error) throw error;

  const row = data?.[0];
  if (!row?.exer_id || !row.exer_debut || !row.exer_fin) {
    throw new Error("Aucun exercice courant trouvé (vw_exercice_view).");
  }

  return {
    exerId: row.exer_id as string,
    exerCode: (row.exer_code ?? null) as string | null,
    debut: row.exer_debut as string,
    fin: row.exer_fin as string,
  };
}