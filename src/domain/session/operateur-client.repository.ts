

// src/domain/session/operateur-client.repository.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { OperClientRow } from "@/domain/_db/rows";

export type CurrentOperateurClientRow = Pick<
  OperClientRow,
  "oper_id" | "oper_actif" | "clt_id" | "clt_nom" | "clt_actif"
>;

export async function listClientsForOperateur(
  operId: string
): Promise<CurrentOperateurClientRow[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_operateur_client_view")
    .select("oper_id,oper_actif,clt_id,clt_nom,clt_actif")
    .eq("oper_id", operId)
    .eq("oper_actif", true)
    .eq("clt_actif", true);

  if (error) throw new Error(error.message);

  return (data ?? []) as CurrentOperateurClientRow[];
}