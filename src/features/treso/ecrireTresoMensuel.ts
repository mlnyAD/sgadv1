

import type { SupabaseClient } from "@supabase/supabase-js";

export async function enregistrerTresoInit(
  supabase: SupabaseClient,
  args: {
    cltId: string;
    exerId: string;
    cptId: string;
    moisDebutExerIso: string; // YYYY-MM-01
    soldeInit: number;
  }
) {
  const { cltId, exerId, cptId, moisDebutExerIso, soldeInit } = args;

  const { data: exist, error: err0 } = await supabase
    .from("tro_mensuel")
    .select("tro_mens_id")
    .eq("tro_clt_id", cltId)
    .eq("tro_exer_id", exerId)
    .eq("tro_cpt_id", cptId)
    .eq("tro_init", true)
    .limit(1);

  if (err0) throw err0;

  const id = exist?.[0]?.tro_mens_id as string | undefined;

  if (id) {
    const { error } = await supabase
      .from("tro_mensuel")
      .update({
        tro_solde_init: soldeInit,
        tro_mois: moisDebutExerIso, // on garde cohérent
        tro_lmod: new Date().toISOString(),
      })
      .eq("tro_mens_id", id);

    if (error) throw error;
    return;
  }

  const { error } = await supabase.from("tro_mensuel").insert({
    tro_clt_id: cltId,
    tro_exer_id: exerId,
    tro_cpt_id: cptId,

    tro_init: true,
    tro_mois: moisDebutExerIso,

    tro_solde_init: soldeInit,
    tro_credits: 0,
    tro_debits: 0,
  });

  if (error) throw error;
}

export async function enregistrerTresoMois(
  supabase: SupabaseClient,
  args: {
    cltId: string;
    exerId: string;
    cptId: string;
    moisIso: string;     // YYYY-MM-01
    credits: number;
    debits: number;
  }
) {
  const { cltId, exerId, cptId, moisIso, credits, debits } = args;

  // 1) Existe ?
  const { data: exist, error: err0 } = await supabase
    .from("tro_mensuel")
    .select("tro_mens_id")
    .eq("tro_clt_id", cltId)
    .eq("tro_exer_id", exerId)
    .eq("tro_cpt_id", cptId)
    .eq("tro_init", false)
    .eq("tro_mois", moisIso)
    .limit(1);

  if (err0) throw err0;

  const id = exist?.[0]?.tro_mens_id as string | undefined;

  if (id) {
    const { error } = await supabase
      .from("tro_mensuel")
      .update({ tro_credits: credits, tro_debits: debits, tro_lmod: new Date().toISOString() })
      .eq("tro_mens_id", id);
    if (error) throw error;
    return;
  }

  // 2) Insert
  const { error } = await supabase.from("tro_mensuel").insert({
    tro_clt_id: cltId,
    tro_exer_id: exerId,
    tro_cpt_id: cptId,
    tro_mois: moisIso,
    tro_init: false,
    tro_credits: credits,
    tro_debits: debits,
    tro_solde_init: 0,
  });

  if (error) throw error;
}