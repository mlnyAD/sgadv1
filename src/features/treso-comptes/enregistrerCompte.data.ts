

import type { SupabaseClient } from "@supabase/supabase-js";

export async function creerCompteTreso(
  supabase: SupabaseClient,
  args: {
    cltId: string;
    nom: string;
    ordre: number;
    inclusGlobal: boolean;
    actif: boolean;
  }
) {
  const { error } = await supabase.from("tro_compte").insert({
    tro_clt_id: args.cltId,
    tro_cpt_nom: args.nom,
    tro_cpt_ordre: args.ordre,
    tro_cpt_inclus_global: args.inclusGlobal,
    tro_cpt_actif: args.actif,
    tro_lmod: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function majCompteTreso(
  supabase: SupabaseClient,
  args: {
    compteId: string;
    nom: string;
    ordre: number;
    inclusGlobal: boolean;
    actif: boolean;
  }
) {
  const { error } = await supabase
    .from("tro_compte")
    .update({
      tro_cpt_nom: args.nom,
      tro_cpt_ordre: args.ordre,
      tro_cpt_inclus_global: args.inclusGlobal,
      tro_cpt_actif: args.actif,
      tro_lmod: new Date().toISOString(),
    })
    .eq("tro_cpt_id", args.compteId);

  if (error) throw error;
}