

// src/domain/client/client-repository.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SELECT_CLIENT_VIEW } from "./client.select";

import type { ClientView } from "./client-types";
import type { ClientRow, ClientInsert, ClientUpdate } from "@/domain/_db/rows";
import { mapClientRowToView } from "./client-mapper";

export async function getClientById(id: string): Promise<ClientView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_client_view")
    .select(SELECT_CLIENT_VIEW)
    .eq("clt_id", id)
    .returns<ClientRow>()
    .maybeSingle();

  if (error || !data) return null;

  return mapClientRowToView(data);
}

export async function createClient(payload: ClientInsert): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase.from("client").insert(payload);
  if (error) throw new Error(error.message);
}

export async function updateClient(clientId: string, payload: ClientUpdate): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase.from("client").update(payload).eq("clt_id", clientId);
  if (error) throw new Error(error.message);
}

export async function deleteClient(clientId: string): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase.from("client").delete().eq("clt_id", clientId);
  if (error) throw new Error(error.message);
}

export async function listClients(params: {
  page: number;
  pageSize: number;
  search?: string;
  actif?: boolean;
}): Promise<{ data: ClientView[]; total: number }> {
  const supabase = await createSupabaseServerReadClient();
  const { page, pageSize, search, actif } = params;

  let query = supabase
    .from("vw_client_view")
    .select(SELECT_CLIENT_VIEW, { count: "exact" })
    .order("clt_nom");

  if (search) query = query.ilike("clt_nom", `%${search}%`);
  if (actif !== undefined) query = query.eq("clt_actif", actif);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query
    .returns<ClientRow[]>()
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data ?? []).map(mapClientRowToView),
    total: count ?? 0,
  };
}