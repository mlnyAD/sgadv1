

import type { SupabaseClient } from "@supabase/supabase-js";
import type { TresoTransactionAnnuelle, TresoCompte, TresoLigneCompte, TresoChartPoint } from "./treso-transaction.types";

type TroCompteRow = {
  tro_cpt_id: string | null;
  tro_cpt_nom: string | null;
  tro_cpt_ordre: number | null;
  tro_cpt_inclus_global: boolean | null;
  tro_cpt_actif: boolean | null;
};

type TroMensuelRow = {
  tro_cpt_id: string | null;
  tro_mois: string | null;        // YYYY-MM-DD
  tro_credits: number | null;
  tro_debits: number | null;
  tro_init: boolean | null;
  tro_solde_init: number | null;
};

function isoMonth(annee: number, monthIndex0: number) {
  const m = String(monthIndex0 + 1).padStart(2, "0");
  return `${annee}-${m}-01`;
}

const MOIS_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

export async function chargerTresoTransactionAnnuelle(
  supabase: SupabaseClient,
  cltId: string,
  exerId: string,
  annee: number
): Promise<TresoTransactionAnnuelle> {
  // 1) Comptes (actifs)
  const { data: comptesData, error: comptesErr } = await supabase
    .from("vw_tro_compte_view")
    .select("tro_cpt_id, tro_cpt_nom, tro_cpt_ordre, tro_cpt_inclus_global, tro_cpt_actif")
    .eq("tro_clt_id", cltId)
    .eq("tro_cpt_actif", true)
    .order("tro_cpt_ordre", { ascending: true });

  if (comptesErr) throw comptesErr;

  const comptes: TresoCompte[] = (comptesData ?? [])
    .filter((r: TroCompteRow) => !!r.tro_cpt_id)
    .map((r: TroCompteRow) => ({
      compteId: r.tro_cpt_id as string,
      nom: (r.tro_cpt_nom ?? "Compte").toString(),
      inclusGlobal: !!r.tro_cpt_inclus_global,
      ordre: r.tro_cpt_ordre ?? 0,
    }));

  // 2) Mois de l’année
  const mois = MOIS_LABELS.map((label, i) => ({ mois: isoMonth(annee, i), label }));

  const start = isoMonth(annee, 0);
  const end = isoMonth(annee + 1, 0); // exclu

  // 3) Lignes mensuelles (init + mois normaux)
  const { data: mensData, error: mensErr } = await supabase
    .from("vw_tro_mensuel_view")
    .select("tro_cpt_id, tro_mois, tro_credits, tro_debits, tro_init, tro_solde_init")
    .eq("tro_clt_id", cltId)
    .eq("tro_exer_id", exerId)
    // on récupère l’année + init
    .or(`tro_init.eq.true,and(tro_init.eq.false,tro_mois.gte.${start},tro_mois.lt.${end})`)
    .order("tro_mois", { ascending: true });

  if (mensErr) throw mensErr;

  const rows = (mensData ?? []) as TroMensuelRow[];

  // init par compte
  const initByCompte = new Map<string, number>();
  // mouvements par compte/mois
  const creditsByCompte = new Map<string, Map<string, number>>();
  const debitsByCompte = new Map<string, Map<string, number>>();

  // dernier mois saisi (mois normal uniquement)
  let dernierMoisSaisi: string | undefined;

  for (const r of rows) {
    if (!r.tro_cpt_id) continue;

    const cptId = r.tro_cpt_id;

    if (r.tro_init) {
      initByCompte.set(cptId, r.tro_solde_init ?? 0);
      continue;
    }

    if (!r.tro_mois) continue;
    const m = r.tro_mois;

    if (!dernierMoisSaisi || m > dernierMoisSaisi) dernierMoisSaisi = m;

    if (!creditsByCompte.has(cptId)) creditsByCompte.set(cptId, new Map());
    if (!debitsByCompte.has(cptId)) debitsByCompte.set(cptId, new Map());

    creditsByCompte.get(cptId)!.set(m, r.tro_credits ?? 0);
    debitsByCompte.get(cptId)!.set(m, r.tro_debits ?? 0);
  }

  // 4) Construire les lignes par compte (mois non saisis => 0) + calcul soldes
  const lignes: TresoLigneCompte[] = comptes.map((compte) => {
    const soldeInit = initByCompte.get(compte.compteId) ?? 0;

    const credits: Record<string, number> = {};
    const debits: Record<string, number> = {};
    const soldes: Record<string, number> = {};

    let soldeCourant = soldeInit;

    for (const m of mois) {
      const c = creditsByCompte.get(compte.compteId)?.get(m.mois) ?? 0;
      const d = debitsByCompte.get(compte.compteId)?.get(m.mois) ?? 0;

      credits[m.mois] = Math.round(c);
      debits[m.mois] = Math.round(d);

      soldeCourant = soldeCourant + c - d;
      soldes[m.mois] = Math.round(soldeCourant);
    }

    return {
      compte,
      soldeInit: Math.round(soldeInit),
      credits,
      debits,
      soldes,
    };
  });

  // 5) Solde global à date (dernier mois saisi) — comptes inclus global
  let soldeGlobalADate = 0;

  if (dernierMoisSaisi) {
    for (const l of lignes) {
      if (!l.compte.inclusGlobal) continue;
      soldeGlobalADate += l.soldes[dernierMoisSaisi] ?? l.soldeInit;
    }
  } else {
    // rien saisi : global = somme des init
    for (const l of lignes) {
      if (!l.compte.inclusGlobal) continue;
      soldeGlobalADate += l.soldeInit;
    }
  }

  soldeGlobalADate = Math.round(soldeGlobalADate);

  // 6) Dataset courbes (uniquement comptes inclus global)
  const comptesChart = comptes.filter((c) => c.inclusGlobal);

  const points: TresoChartPoint[] = mois.map((m, idx) => {
    const p: TresoChartPoint = {
      mois: MOIS_LABELS[idx],
      date: m.mois,
    };

    for (const l of lignes) {
      if (!l.compte.inclusGlobal) continue;
      p[l.compte.compteId] = l.soldes[m.mois];
    }

    return p;
  });

  return {
    exerId,
    annee,
    mois,
    lignes,
    dernierMoisSaisi,
    soldeGlobalADate,
    chart: {
      comptes: comptesChart,
      points,
    },
  };
}