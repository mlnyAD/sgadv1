

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
/*
export async function createClient(payload: ClientInsert): Promise<string> {
  const supabase = await createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("client")
    .insert(payload)
    .select("clt_id")
    .single();

  if (error || !data?.clt_id) {
    console.error("createClient failed", {
      payload,
      code: error?.code,
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
    });

    throw new Error(
      error
        ? [
            error.message,
            error.details,
            error.hint,
          ]
            .filter(Boolean)
            .join(" | ")
        : "Création client impossible"
    );
  }

  return data.clt_id;
}
  */
export async function createClient(payload: ClientInsert): Promise<string> {
  const supabase = await createSupabaseAdminClient();

  console.log("createClient:start", { payload });

  const { data, error } = await supabase
    .from("client")
    .insert(payload)
    .select("clt_id")
    .single();

  console.log("createClient:after-insert", {
    data,
    error: error
      ? {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        }
      : null,
  });

  if (error || !data?.clt_id) {
    throw new Error(
      error
        ? [error.message, error.details, error.hint].filter(Boolean).join(" | ")
        : "Création client impossible"
    );
  }

  console.log("createClient:success", { clt_id: data.clt_id });

  return data.clt_id;
}


export async function updateClient(clientId: string, payload: ClientUpdate): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("client")
    .update(payload)
    .eq("clt_id", clientId);

  if (error) {
    console.error("updateClient failed", {
      clientId,
      payload,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error(
      [error.message, error.details, error.hint].filter(Boolean).join(" | ")
    );
  }
}

export async function deleteClient(clientId: string): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("client")
    .delete()
    .eq("clt_id", clientId);

  if (error) {
    console.error("deleteClient failed", {
      clientId,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error(
      [error.message, error.details, error.hint].filter(Boolean).join(" | ")
    );
  }
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