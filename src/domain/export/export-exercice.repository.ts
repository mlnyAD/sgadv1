

// src/domain/export/export-exercise.repository.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

export type ExportExerciseOption = {
  exerId: string;
  exerCode: string;
};

export async function listExportExerciseOptions(params: {
  cltId: string;
}): Promise<ExportExerciseOption[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_exercice_view")
    .select("exer_id, exer_code, exer_actif, exer_debut")
    .eq("clt_id", params.cltId)
    .order("exer_debut", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as Array<{
    exer_id: string | null;
    exer_code: string | null;
    exer_actif: boolean | null;
    exer_debut: string | null;
  }>;

  return rows
    .filter((row) => !!row.exer_id)
    .map((row) => ({
      exerId: row.exer_id as string,
      exerCode: row.exer_code ?? row.exer_id ?? "",
    }));
}