

// src/domain/operateur/operateur-client.repository.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { AuthenticatedOperateur } from "./authenticated-operateur.interface";

/* ------------------------------------------------------------------ */
/* Liste des opérateurs selon le rôle                                 */
/* ------------------------------------------------------------------ */
export async function listOperateursForAuthenticatedOperateur(
  auth: AuthenticatedOperateur
) {
  const supabase = await createSupabaseServerReadClient();

  // 🟢 ADMIN SYS : tous les opérateurs
  if (auth.isAdminSys) {
    const { data, error } = await supabase
      .from("vw_operateur_view")
      .select("*")
      .order("oper_nom");

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  // 🔵 NON ADMIN : opérateurs liés aux mêmes clients
  // (règle métier : opérateurs du client)
  const { data, error } = await supabase
    .from("vw_operateur_view")
    .select("*")
    .in("oper_id", auth.clientIds);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/* ------------------------------------------------------------------ */
/* Read                                                               */
/* ------------------------------------------------------------------ */

export async function listClientIdsForOperateur(
  operId: string
): Promise<string[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("operateur_client")
    .select("clt_id")
    .eq("oper_id", operId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((r) => r.clt_id);
}
