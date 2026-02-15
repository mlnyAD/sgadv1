

// src/domain/operateur/operateur-client.repository.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { AuthenticatedOperateur } from "./authenticated-operateur.interface";
import { SELECT_OPERATEUR_VIEW } from "./operateur.select";

export async function listOperateursForAuthenticatedOperateur(
  auth: AuthenticatedOperateur
) {
  const supabase = await createSupabaseServerReadClient();

  // 🟢 ADMIN SYS : tous les opérateurs
  if (auth.isAdminSys) {
    const { data, error } = await supabase
      .from("vw_operateur_view")
      .select(SELECT_OPERATEUR_VIEW)
      .order("oper_nom");

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  // 🔵 NON ADMIN : opérateurs liés aux mêmes clients
  // Étape 1: récupérer les oper_id associés aux clientIds
  const { data: links, error: linksErr } = await supabase
    .from("vw_operateur_client_view")
    .select("oper_id")
    .in("clt_id", auth.clientIds);

  if (linksErr) throw new Error(linksErr.message);

  const operIds = Array.from(new Set((links ?? []).map((r) => r.oper_id).filter(Boolean))) as string[];
  if (operIds.length === 0) return [];

  // Étape 2: récupérer les opérateurs
  const { data, error } = await supabase
    .from("vw_operateur_view")
    .select(SELECT_OPERATEUR_VIEW)
    .in("oper_id", operIds)
    .order("oper_nom");

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listClientIdsForOperateur(operId: string): Promise<string[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("operateur_client")
    .select("clt_id")
    .eq("oper_id", operId);

  if (error) throw new Error(error.message);

  // clt_id est possiblement nullable selon les types générés
  return (data ?? []).map((r) => r.clt_id).filter(Boolean) as string[];
}