

// src/domain/fisc/fisc-repository.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SELECT_FISC_VIEW } from "./fisc.select";

import type { FiscView } from "./fisc-types";
import type { FiscRow, FiscInsert, FiscUpdate } from "@/domain/_db/rows";
import { mapFiscRowToView } from "./fisc-mapper";
import { getCurrentClient } from "@/domain/session/current-client";

export async function getFiscById(params: {
  cltId: string;
  fiscId: string;
}): Promise<FiscView | null> {
  const supabase = await createSupabaseServerReadClient();


  const { data, error } = await supabase
    .from("vw_fisc_view")
    .select(SELECT_FISC_VIEW)
    .eq("fisc_id", params.fiscId)
    .eq("fisc_clt_id", params.cltId)
    .maybeSingle();

  if (error || !data) return null;

  return mapFiscRowToView(data as unknown as FiscRow);
}

export async function createFisc(payload: Omit<FiscInsert, "fisc_clt_id" | "fisc_soc_id">): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  const insertPayload: FiscInsert = {
    ...payload,
    fisc_clt_id: current.cltId,
    fisc_soc_id: current.cltId, // ✅ TEMP: société = client
  };

  const { error } = await supabase.from("fisc").insert(insertPayload);
  if (error) throw new Error(error.message);
}

export async function updateFisc(fiscId: string, payload: FiscUpdate): Promise<void> {

  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("fisc")
    .update({
      ...payload,
      fisc_soc_id: current.cltId, // ✅ TEMP: on force la cohérence
    })
    .eq("fisc_id", fiscId)
    .eq("fisc_clt_id", current.cltId);

  if (error) throw new Error(error.message);
}

export async function listFisc(params: {
  cltId: string;
  page: number;
  pageSize: number;
  exerciceId?: string;
  typeId?: number;
  societeId?: string;
}): Promise<{ data: FiscView[]; total: number }> {
  const { cltId, page, pageSize, exerciceId, typeId, societeId } = params;

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_fisc_view")
    .select(SELECT_FISC_VIEW, { count: "exact" })
    .eq("fisc_clt_id", cltId)
    .order("fisc_date", { ascending: true, nullsFirst: false }) // nulls last
    .order("fisc_type_id", { ascending: true });

  if (exerciceId) query = query.eq("fisc_exer_id", exerciceId);
  if (typeId !== undefined) query = query.eq("fisc_type_id", typeId);
  if (societeId) query = query.eq("fisc_soc_id", societeId);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as unknown as FiscRow[];

  return {
    data: rows.map(mapFiscRowToView),
    total: count ?? 0,
  };
}

export async function deleteFisc(fiscId: string): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("fisc")
    .delete()
    .eq("fisc_id", fiscId)
    .eq("fisc_clt_id", current.cltId);

  if (error) throw new Error(error.message);
}