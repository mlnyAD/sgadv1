

"use server"

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCurrentClient } from "@/domain/session/current-client";

export async function enregistrerTresoInit(args: {
  exerId: string;
  cptId: string;
  moisDebutExerIso: string; // YYYY-MM-01
  soldeInit: number;
}) {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  const { exerId, cptId, moisDebutExerIso, soldeInit } = args;

  const { data: exist, error: err0 } = await supabase
    .from("tro_mensuel")
    .select("tro_mens_id")
    .eq("tro_clt_id", current.cltId)
    .eq("tro_exer_id", exerId)
    .eq("tro_cpt_id", cptId)
    .eq("tro_init", true)
    .limit(1);

  if (err0) throw new Error(err0.message);

  const id = exist?.[0]?.tro_mens_id as string | undefined;

  if (id) {
    const { error } = await supabase
      .from("tro_mensuel")
      .update({
        tro_solde_init: soldeInit,
        tro_mois: moisDebutExerIso,
        tro_lmod: new Date().toISOString(),
      })
      .eq("tro_mens_id", id)
      .eq("tro_clt_id", current.cltId);

    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await supabase.from("tro_mensuel").insert({
    tro_clt_id: current.cltId,
    tro_exer_id: exerId,
    tro_cpt_id: cptId,

    tro_init: true,
    tro_mois: moisDebutExerIso,

    tro_solde_init: soldeInit,
    tro_credits: 0,
    tro_debits: 0,
    tro_lmod: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}

export async function enregistrerTresoMois(args: {
  exerId: string;
  cptId: string;
  moisIso: string; // YYYY-MM-01
  credits: number;
  debits: number;
}) {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  const { exerId, cptId, moisIso, credits, debits } = args;

  const { data: exist, error: err0 } = await supabase
    .from("tro_mensuel")
    .select("tro_mens_id")
    .eq("tro_clt_id", current.cltId)
    .eq("tro_exer_id", exerId)
    .eq("tro_cpt_id", cptId)
    .eq("tro_init", false)
    .eq("tro_mois", moisIso)
    .limit(1);

  if (err0) throw new Error(err0.message);

  const id = exist?.[0]?.tro_mens_id as string | undefined;

  if (id) {
    const { error } = await supabase
      .from("tro_mensuel")
      .update({
        tro_credits: credits,
        tro_debits: debits,
        tro_lmod: new Date().toISOString(),
      })
      .eq("tro_mens_id", id)
      .eq("tro_clt_id", current.cltId);

    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await supabase.from("tro_mensuel").insert({
    tro_clt_id: current.cltId,
    tro_exer_id: exerId,
    tro_cpt_id: cptId,

    tro_mois: moisIso,
    tro_init: false,

    tro_credits: credits,
    tro_debits: debits,
    tro_solde_init: 0,
    tro_lmod: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}