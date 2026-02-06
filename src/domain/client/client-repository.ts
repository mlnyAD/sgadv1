

// src/domain/client/client-repository.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { mapClientViewRowToUI } from "@/domain/client/client-view-mapper";
import { ClientPersistencePayload, ClientView } from "./client-types";
import { ClientUI } from "./client-types";
import { mapClientUIToDbCreate } from "./client-mapper";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";


/* ------------------------------------------------------------------ */
/* Read */
/* ------------------------------------------------------------------ */
export async function getClientById(
  id: string
): Promise<ClientView | null> {

  const supabase = await createSupabaseServerReadClient();

  //console.log("GetClientById id = ", id);

  const { data, error } = await supabase
    .from("vw_client_view")
    .select("*")
    .eq("clt_id", id)
    .single();

  //console.log("Après GetClientById error, client = ", error, data);

  if (error || !data) {
    return null;
  }

  return mapClientViewRowToUI(data);
}


/* ------------------------------------------------------------------ */
/* CREATE */
/* ------------------------------------------------------------------ */

export async function createClient(client: ClientUI): Promise<void> {

  const supabase = await createSupabaseAdminClient();

  const payloadDb = mapClientUIToDbCreate(client);

  console.log("SERVICE KEY PRESENT:", Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY));

  const { error } = await supabase
    .from("client")
    .insert(payloadDb);

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
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("client")
    .update(payload)
    .eq("clt_id", clientId);

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
    query = query.ilike("clt_nom", `%${search}%`);
  }

  if (actif !== undefined) {
    query = query.eq("clt_actif", actif);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

//console.log("RAW CLIENT ROW =", data?.[0]);
//console.log("RAW CLIENT KEYS =", data?.[0] && Object.keys(data[0]));


  return {
    data:  (data ?? []).map(mapClientViewRowToUI), 
    total: count ?? 0,
  };
}

/**********************************************************
 * Delete d'un client
 **********************************************************/
export async function deleteClient(
  clientId: string
): Promise<void> {

  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("client")
    .delete()
    .eq("clt_id", clientId)

  if (error) {
    throw error;
  }
}

