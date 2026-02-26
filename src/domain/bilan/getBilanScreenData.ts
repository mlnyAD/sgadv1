

import { getCurrentClient } from "@/domain/session/current-client";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { loadSalesTotals, loadPurchaseTotals } from "@/features/bilan/bilan.data";
import { computeBilan } from "@/domain/bilan/bilan.calculations";
import { BilanConfig } from "@/domain/bilan/bilan.config";

type ExerciseOption = { exer_id: string; exer_code: string | null };

export type BilanColumn = {
  caHt: number;
  chargesHt: number;
  rex: number;
  impot: number;
  resultatNet: number;
  reserveLegale: number;
  beneficesNets: number;
};

export type BilanScreenData = {
  exerid: string;
  exerciseOptions: ExerciseOption[];
  columns: {
    budget: BilanColumn;
    toDate: BilanColumn;
    sandbox: BilanColumn; // initialisé = toDate, puis modifié côté client
  };
  meta: {
    exerCode: string | null;
    config: typeof BilanConfig;
  };
};

const VW_EXER = "vw_exercice_view";

export async function getBilanScreenData(params: { exerid?: string }): Promise<BilanScreenData> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client courant");
  const cltId = current.cltId;

  const supabase = createSupabaseAdminClient();

  // Exercice options + resolve exercice courant
  const { data: exerRows, error: exerErr } = await supabase
    .from(VW_EXER)
    .select("exer_id, exer_code, exer_actif, exer_debut")
    .eq("clt_id", cltId)
    .order("exer_debut", { ascending: false });

  if (exerErr) throw new Error(exerErr.message);

  const exerciseOptions: ExerciseOption[] = (exerRows ?? [])
    .filter((r) => !!r.exer_id)
    .map((r) => ({ exer_id: r.exer_id as string, exer_code: r.exer_code ?? null }));

  const active = (exerRows ?? []).find((r) => r.exer_actif && r.exer_id);
  const resolvedExerId =
    params.exerid ??
    (active?.exer_id as string | undefined) ??
    (exerciseOptions[0]?.exer_id as string | undefined);

  if (!resolvedExerId) {
    // aucun exercice
    const empty = computeBilan({ caHt: 0, chargesHt: 0 });
    return {
      exerid: "",
      exerciseOptions,
      columns: { budget: empty, toDate: empty, sandbox: empty },
      meta: { exerCode: null, config: BilanConfig },
    };
  }

  const exerCode =
    (exerRows ?? []).find((r) => r.exer_id === resolvedExerId)?.exer_code ?? null;

  // Totaux sales/purchases (budget + réalisé)
  const [sales, purchases] = await Promise.all([
    loadSalesTotals(supabase, { cltId, exerId: resolvedExerId }),
    loadPurchaseTotals(supabase, { cltId, exerId: resolvedExerId }),
  ]);

  const budget = computeBilan({ caHt: sales.totalBudgetEur, chargesHt: purchases.totalBudgetEur });
  const toDate = computeBilan({ caHt: sales.totalRealizedEur, chargesHt: purchases.totalRealizedEur });

  // sandbox initial = toDate (UI modifiera ca/charges puis recompute)
  const sandbox = { ...toDate };

  return {
    exerid: resolvedExerId,
    exerciseOptions,
    columns: { budget, toDate, sandbox },
    meta: { exerCode: (exerCode as string | null) ?? null, config: BilanConfig },
  };
}