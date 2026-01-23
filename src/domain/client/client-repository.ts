

// src/domain/client/client-repository.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import { mapClientDbToUI } from "./client-mapper";
import { ClientPersistencePayload, ClientView } from "./client-types";


/* ------------------------------------------------------------------ */
/* Read */
/* ------------------------------------------------------------------ */
export async function getClientById(
  id: string
): Promise<ClientView | null> {

  const supabase = await createSupabaseServerReadClient();

  console.log("GetClientById id = ", id)

  const { data, error } = await supabase
    .from("vw_client_view")
    .select(`
      client_id,
      client_nom,
      client_code,
      adresse,
      code_postal,
      ville,
      pays,
      email,
      telephone,
      actif
    `)
    .eq("client_id", id)
    .single();

    
  console.log("Après GetClientById error, client = ", error, data)

  if (error || !data) {
    return null;
  }

  return mapClientDbToUI(data);
}

/* ------------------------------------------------------------------ */
/* CREATE */
/* ------------------------------------------------------------------ */
export async function createClient(
  payload: ClientPersistencePayload
): Promise<void> {
  const supabase = await createSupabaseServerReadClient();

  const { error } = await supabase
    .from("client")
    .insert(payload);

  if (error) {
    throw new Error(error.message);
  }
}

/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export async function updateClient(
  clientId: string,
  payload: ClientPersistencePayload
): Promise<void> {
  const supabase = await createSupabaseServerReadClient();

  const { error } = await supabase
    .from("client")
    .update(payload)
    .eq("client_id", clientId);

  if (error) {
    throw new Error(error.message);
  }
}

/* ------------------------------------------------------------------ */
/* LIST */
/* ------------------------------------------------------------------ */
export async function listClients(params: {
  page: number;
  pageSize: number;
  search?: string;
  actif?: boolean;
}) {
  const { page, pageSize, search, actif } = params;

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_client_view")
    .select("*", { count: "exact" });

  if (search) {
    query = query.ilike("client_nom", `%${search}%`);
  }

  if (actif !== undefined) {
    query = query.eq("actif", actif);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: (data ?? []).map(mapClientDbToUI), // ⭐⭐⭐ FIX
    total: count ?? 0,
  };
}

/**********************************************************
 * Delete d'un client
 **********************************************************/
export async function deleteClient(
  clientId: string
): Promise<void> {

  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("client")
    .delete()
    .eq("client_id", clientId)

  if (error) {
    throw error;
  }
}

