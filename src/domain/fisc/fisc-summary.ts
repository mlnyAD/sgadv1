

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { FISC_TYPES, toFiscTypeId } from "./fisc-types.catalog";

type FiscSummaryRow = {
  fisc_type_id: number | null;
  fisc_montant: string | number | null;
};

export type FiscSummary = {
  rows: {
    fiscTypeId: number;
    code: string;
    libelle: string;
    montantEur: number;
  }[];
  totalEur: number;
};

function toAmount(value: string | number | null | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value !== "string") return 0;

  const normalized = value.replace(",", ".").trim();
  const n = Number(normalized);

  return Number.isFinite(n) ? n : 0;
}

export async function getFiscSummary(params: {
  cltId: string;
  exerId: string;
}): Promise<FiscSummary | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_fisc_view")
    .select("fisc_type_id, fisc_montant")
    .eq("fisc_clt_id", params.cltId)
    .eq("fisc_exer_id", params.exerId);

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as FiscSummaryRow[];

  if (rows.length === 0) {
    return null;
  }

  const totalsByType = new Map<number, number>();

  for (const row of rows) {
    const typeId = toFiscTypeId(Number(row.fisc_type_id ?? 5));
    const amount = toAmount(row.fisc_montant);

    totalsByType.set(typeId, (totalsByType.get(typeId) ?? 0) + amount);
  }

  const summaryRows = FISC_TYPES.map((type) => {
    const amount = Math.round(totalsByType.get(type.id) ?? 0);

    return {
      fiscTypeId: type.id,
      code: type.code,
      libelle: type.libelle,
      montantEur: amount,
    };
  }).filter((row) => row.montantEur !== 0);

  const totalEur = summaryRows.reduce(
    (acc, row) => acc + row.montantEur,
    0,
  );

  return {
    rows: summaryRows,
    totalEur,
  };
}