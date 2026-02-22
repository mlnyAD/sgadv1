

import type { SupabaseClient } from "@supabase/supabase-js";
import type { TresoCompte } from "./treso-comptes.types";

type Row = {
  tro_cpt_id: string | null;
  tro_cpt_nom: string | null;
  tro_cpt_ordre: number | null;
  tro_cpt_inclus_global: boolean | null;
  tro_cpt_actif: boolean | null;
};

export async function listerComptesTreso(
  supabase: SupabaseClient,
  cltId: string
): Promise<TresoCompte[]> {
  const { data, error } = await supabase
    .from("vw_tro_compte_view")
    .select("tro_cpt_id, tro_cpt_nom, tro_cpt_ordre, tro_cpt_inclus_global, tro_cpt_actif")
    .eq("tro_clt_id", cltId)
    .order("tro_cpt_ordre", { ascending: true });

  if (error) throw error;

  return (data ?? [])
    .filter((r: Row) => !!r.tro_cpt_id)
    .map((r: Row) => ({
      troCptId: r.tro_cpt_id as string,
      troCptNom: (r.tro_cpt_nom ?? "").toString(),
      troCptOrdre: r.tro_cpt_ordre ?? 0,
      troCptInclusGlobal: !!r.tro_cpt_inclus_global,
      troCptActif: !!r.tro_cpt_actif,
    }));
}