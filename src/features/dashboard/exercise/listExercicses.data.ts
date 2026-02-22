

import type { SupabaseClient } from "@supabase/supabase-js";

export type ExerciceListeItem = {
  exerId: string;
  exerCode: string | null;
  debut: string;
  fin: string;
};

export async function listExercisesForClient(supabase: SupabaseClient, cltId: string): Promise<ExerciceListeItem[]> {
  const { data, error } = await supabase
    .from("vw_exercice_view")
    .select("exer_id, exer_code, exer_debut, exer_fin, clt_id")
    .eq("clt_id", cltId)
    .order("exer_debut", { ascending: false });

  if (error) throw error;

  return (data ?? [])
    .filter((r) => r.exer_id && r.exer_debut && r.exer_fin)
    .map((r) => ({
      exerId: r.exer_id,
      exerCode: r.exer_code ?? null,
      debut: r.exer_debut,
      fin: r.exer_fin,
    }));
}