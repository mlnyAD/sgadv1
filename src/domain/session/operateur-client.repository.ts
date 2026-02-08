

"use server";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

export type OperateurClientRow = {
  oper_id: string;
  clt_id: string;
  clt_nom: string;
  oper_actif: boolean;
  clt_actif: boolean;
};

export async function listClientsForCurrentOperateur(): Promise<OperateurClientRow[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) throw new Error("Non authentifié");

  const operId = userRes.user.id;

  const { data, error } = await supabase
    .from("vw_operateur_client_view")
    .select("oper_id,oper_actif,clt_id,clt_nom,clt_actif")
    .eq("oper_id", operId)
    .eq("oper_actif", true)
    .eq("clt_actif", true);

  if (error) throw new Error(error.message);
  return (data ?? []) as OperateurClientRow[];
}