

// src/domain/rapport/services/getRapportTresorerie.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { chargerBlocTresoDashboard } from "@/features/treso/chargerBlocTresoDashboard";
import { loadTvaBlock } from "@/features/dashboard/blocks/tva/tva.data";
import { mapRapportTresorerie } from "../mappers/mapRapportTresorerie";

export async function getRapportTresorerie(params: {
  cltId: string;
  exerId: string;
}) {
  const supabase = await createSupabaseServerReadClient();

  const [treasury, tva] = await Promise.all([
    chargerBlocTresoDashboard(supabase, params.cltId, params.exerId),
    loadTvaBlock(supabase, params.cltId, params.exerId),
  ]);

  return mapRapportTresorerie({
    treasury,
    tva,
  });
}