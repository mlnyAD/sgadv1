

// src/features/session/current-operateur-client-action.ts

"use server";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { listClientsForOperateur } from "@/domain/session/operateur-client.repository";

export async function listClientsForCurrentOperateur() {
  const supabase = await createSupabaseServerReadClient();

  const { data: userRes, error: userErr } = await supabase.auth.getUser();

  // si pas auth, on renvoie vide (la page gère l’état)
  if (userErr || !userRes.user) return [];

  return listClientsForOperateur(userRes.user.id);
}