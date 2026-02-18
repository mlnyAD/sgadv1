

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SELECT_EXERCICE_VIEW } from "./exercice.select";

import type { ExerciceView } from "./exercice-types";
import type { ExerciceRow, ExerciceInsert, ExerciceUpdate } from "@/domain/_db/rows";
import { mapExerciceRowToView } from "./exercice-mapper";
import { getCurrentClient } from "../session/current-client";

export async function getExerciceById(params: {
  cltId: string;
  exerciceId: string;
}): Promise<ExerciceView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_exercice_view")
    .select(SELECT_EXERCICE_VIEW)
    .eq("exer_id", params.exerciceId)
    .eq("clt_id", params.cltId)
    .maybeSingle();

  if (error || !data) return null;

  return mapExerciceRowToView(data as unknown as ExerciceRow);
}

export async function createExercice(payload: Omit<ExerciceInsert, "clt_id">): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase.from("exercice").insert({ ...payload, clt_id: current.cltId });
  if (error) throw new Error(error.message);
}

export async function updateExercice(exerciceId: string, payload: ExerciceUpdate): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase
    .from("exercice")
    .update(payload)
    .eq("exer_id", exerciceId)
    .eq("clt_id", current.cltId);

  if (error) throw new Error(error.message);
}

export async function listExercices(params: {
  cltId: string;
  page: number;
  pageSize: number;
  search?: string;
  actif?: boolean;
}): Promise<{ data: ExerciceView[]; total: number }> {
  const { cltId, page, pageSize, search, actif } = params;

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_exercice_view")
    .select(SELECT_EXERCICE_VIEW, { count: "exact" })
    .eq("clt_id", cltId)              // ✅ scope client
    .order("exer_code");

  if (search) query = query.ilike("exer_code", `%${search}%`);
  if (actif !== undefined) query = query.eq("exer_actif", actif);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as unknown as ExerciceRow[];

  return {
    data: rows.map(mapExerciceRowToView),
    total: count ?? 0,
  };
}

export async function listExerciceOptions(params: {
  cltId: string;
  actifOnly?: boolean;
}): Promise<ExerciceRow[]> {
  const supabase = await createSupabaseServerReadClient();

  let q = supabase
    .from("vw_exercice_view")
    .select("exer_id,exer_code,exer_actif")
    .eq("clt_id", params.cltId)
    .order("exer_code", { ascending: false });

  if (params.actifOnly) q = q.eq("exer_actif", true);

  const { data, error } = await q;
  if (error) throw new Error(error.message);

  return (data ?? []) as unknown as ExerciceRow[];
}