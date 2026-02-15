

// src/features/session/current-operateur-client-action.ts

"use server";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { listClientsForOperateur } from "@/domain/session/operateur-client.repository";

export async function listClientsForCurrentOperateur() {
  const supabase = await createSupabaseServerReadClient();

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) throw new Error("Non authentifié");

  return listClientsForOperateur(userRes.user.id);
}