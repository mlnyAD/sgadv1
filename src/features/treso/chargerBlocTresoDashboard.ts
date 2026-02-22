

import type { SupabaseClient } from "@supabase/supabase-js";
import type { DashboardTreasury } from "@/features/dashboard/dashboard.types";

type TroCompteRow = {
  tro_cpt_id: string | null;
  tro_cpt_nom: string | null;
  tro_cpt_ordre: number | null;
  tro_cpt_inclus_global: boolean | null;
  tro_cpt_actif: boolean | null;
};

type TroInitRow = {
  tro_cpt_id: string | null;
  tro_solde_init: number | null;
};

type TroSoldeRow = {
  tro_cpt_id: string | null;
  tro_mois: string | null;     // YYYY-MM-DD
  tro_solde: number | null;
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export async function chargerBlocTresoDashboard(
  supabase: SupabaseClient,
  cltId: string,
  exerId: string
): Promise<DashboardTreasury> {
  const today = todayIso();

  // 1) Comptes
  const { data: comptesData, error: comptesErr } = await supabase
    .from("vw_tro_compte_view")
    .select("tro_cpt_id, tro_cpt_nom, tro_cpt_ordre, tro_cpt_inclus_global, tro_cpt_actif")
    .eq("tro_clt_id", cltId)
    .eq("tro_cpt_actif", true)
    .order("tro_cpt_ordre", { ascending: true });

  if (comptesErr) throw comptesErr;

  const comptes = (comptesData ?? []) as TroCompteRow[];

  // 2) Inits (report n-1)
  const { data: initData, error: initErr } = await supabase
    .from("vw_tro_mensuel_view")
    .select("tro_cpt_id, tro_solde_init")
    .eq("tro_clt_id", cltId)
    .eq("tro_exer_id", exerId)
    .eq("tro_init", true);

  if (initErr) throw initErr;

  const initRows = (initData ?? []) as TroInitRow[];
  const initByCompte = new Map<string, number>();
  for (const r of initRows) {
    if (r.tro_cpt_id) initByCompte.set(r.tro_cpt_id, r.tro_solde_init ?? 0);
  }

  // 3) Soldes mensuels calculés
  const { data: soldesData, error: soldesErr } = await supabase
    .from("vw_tro_soldes_mensuels_view")
    .select("tro_cpt_id, tro_mois, tro_solde")
    .eq("tro_clt_id", cltId)
    .eq("tro_exer_id", exerId)
    .lte("tro_mois", today)
    .order("tro_mois", { ascending: true });

  if (soldesErr) throw soldesErr;

  const soldes = (soldesData ?? []) as TroSoldeRow[];

  // Dernier solde par compte
  const lastByCompte = new Map<string, { mois: string; solde: number }>();
  for (const r of soldes) {
    if (!r.tro_cpt_id || !r.tro_mois) continue;
    lastByCompte.set(r.tro_cpt_id, { mois: r.tro_mois, solde: r.tro_solde ?? 0 });
  }

  // 4) Construction résultat
  let asOf = today;
  let soldeGlobal = 0;

  const comptesOut = comptes
    .filter((c) => !!c.tro_cpt_id)
    .map((c) => {
      const compteId = c.tro_cpt_id as string;
      const nom = (c.tro_cpt_nom ?? "Compte").toString();
      const inclusGlobal = !!c.tro_cpt_inclus_global;

      const last = lastByCompte.get(compteId);
      const solde = last?.solde ?? initByCompte.get(compteId) ?? 0;

      // date "asOf" = max des derniers mois trouvés (sinon today)
      if (last?.mois && last.mois > asOf) asOf = last.mois;

      if (inclusGlobal) soldeGlobal += solde;

      return { compteId, nom, inclusGlobal, soldeEur: Math.round(solde) };
    });

  soldeGlobal = Math.round(soldeGlobal);

  return {
    asOf,
    amountEur: soldeGlobal,      // compat avec la card actuelle
    soldeGlobalEur: soldeGlobal,
    comptes: comptesOut,
  };
}