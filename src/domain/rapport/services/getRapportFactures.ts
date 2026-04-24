

// src/domain/rapport/services/getRapportFactures.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { loadReceivablesBlock } from "@/features/dashboard/blocks/receivables/receivables.data";
import { mapRapportFactures } from "../mappers/mapRapportFactures";
import type { RapportFacturesData } from "../types";

export async function getRapportFactures(params: {
  cltId: string;
  exerId: string;
}): Promise<RapportFacturesData | null> {
  const supabase = await createSupabaseServerReadClient();

  const receivables = await loadReceivablesBlock(
    supabase,
    params.cltId,
    params.exerId,
  );

  return mapRapportFactures(receivables);
}