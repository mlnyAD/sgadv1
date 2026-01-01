
// src/domain/societe/societe.repository.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import { SocieteDbRow } from "./societe.db";
import { mapSocieteDbToUI } from "./societe.mapper";
import { mapSocieteUIToDb } from "./societe.mapper";
import { SocieteUI } from "./societe.ui";

/* ------------------------------------------------------------------ */
/* Read */
/* ------------------------------------------------------------------ */

export async function getSocieteById(
  id: number
): Promise<SocieteUI | null> {

  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_societe_view")
    .select("*")
    .eq("societe_id", id)
    .maybeSingle<SocieteDbRow>();

  if (error || !data) {
    return null;
  }

  return mapSocieteDbToUI(data);
}

/* ------------------------------------------------------------------ */
/* Read - list */
/* ------------------------------------------------------------------ */

export interface SocieteListResult {
  data: SocieteUI[];
  total: number;
}

interface ListParams {
  page: number;
  pageSize: number;
  search?: string;
}

export async function listSocietes(
  params: ListParams
): Promise<SocieteListResult> {

   const supabase = await createSupabaseServerReadClient();
  const { page, pageSize, search } = params;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("vw_societe_view")
    .select("*", { count: "exact" });

  if (search) {
    query = query.ilike("societe_nom", `%${search}%`);
  }

  const { data, error, count } = await query
    .range(from, to)
    .order("societe_nom", { ascending: true });

  if (error || !data) {
    return { data: [], total: 0 };
  }

  return {
    data: data.map(mapSocieteDbToUI),
    total: count ?? 0,
  };
}

/* ------------------------------------------------------------------ */
/* CREATE */
/* ------------------------------------------------------------------ */

export async function createSociete(
  ui: SocieteUI
): Promise<number> {

  const supabase = await createSupabaseServerActionClient();

  const payload = mapSocieteUIToDb(ui);

  const { data, error } = await supabase
    .from("societe")
    .insert(payload)
    .select("societe_id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Create failed");
  }

  return data.societe_id as number;
}


/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export async function updateSociete(
  id: number,
  ui: SocieteUI
): Promise<void> {

  const supabase = await createSupabaseServerActionClient();

  const payload = mapSocieteUIToDb(ui);

  const { error } = await supabase
    .from("societe")
    .update(payload)
    .eq("societe_id", id);

  if (error) {
    throw new Error(error.message);
  }
}


/* ------------------------------------------------------------------
   DELETE
   ------------------------------------------------------------------ */

export async function deleteSociete(
  id: number
): Promise<void> {

  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("societe")
    .delete()
    .eq("societe_id", id);

  if (error) {
    throw new Error(error.message);
  }
}