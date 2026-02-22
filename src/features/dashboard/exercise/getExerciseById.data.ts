

import type { SupabaseClient } from "@supabase/supabase-js";

export async function getExerciseById(supabase: SupabaseClient, exerId: string) {
  const { data, error } = await supabase
    .from("vw_exercice_view")
    .select("exer_id, exer_code, exer_debut, exer_fin, clt_id")
    .eq("exer_id", exerId)
    .limit(1);

  if (error) throw error;

  const row = data?.[0];
  if (!row?.exer_id || !row.exer_debut || !row.exer_fin) {
    throw new Error("Exercice introuvable.");
  }

  return {
    exerId: row.exer_id,
    exerCode: row.exer_code ?? null,
    debut: row.exer_debut,
    fin: row.exer_fin,
    cltId: row.clt_id ?? null,
  };
}