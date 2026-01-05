

// src/domain/client/client.repository.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import { mapClientDbToUI, mapClientUIToDbCreate, mapClientUIToDbUpdate } from "./client.mapper";
import { ClientUI } from "./client.ui";


/* ------------------------------------------------------------------ */
/* Read */
/* ------------------------------------------------------------------ */
export async function getClientById(
  id: string
): Promise<ClientUI | null> {

  const supabase = await createSupabaseServerReadClient();

  console.log("GetClientById id = ", id)

  const { data, error } = await supabase
    .from("vw_client")
    .select(`
      client_id,
      client_nom,
      client_adresse,
      client_code_postal,
      client_ville,
      client_siren,
      client_status,
      client_created_at,
      client_validated_at,
      client_created_by
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
  ui: ClientUI,
  createdBy: string
): Promise<number> {

  const supabase = await createSupabaseServerActionClient();

  const payload = mapClientUIToDbCreate(ui, createdBy);


  const { data, error } = await supabase
    .from("client")
    .insert(payload)
    .select("client_id")
    .single();

	console.log("Retour create Client error = ", error)

  if (error || !data) {
    throw new Error(error?.message ?? "Create client failed");
  }

  return data.client_id as number;
}

/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export async function updateClient(
  id: string,
  ui: ClientUI
): Promise<void> {
  const supabase = await createSupabaseServerActionClient();

  const payload = mapClientUIToDbUpdate(ui);


  const { error } = await supabase
    .from("client")
    .update(payload)
    .eq("client_id", id);

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
  status?: string | null;
}): Promise<{ data: ClientUI[]; total: number }> {

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_client")
    .select("*", { count: "exact" });

  /* Recherche par nom */
  if (params.search) {
    query = query.ilike("client_nom", `%${params.search}%`);
  }

  /* Filtre état (préparé pour plus tard) */
  if (params.status) {
    query = query.eq("client_status", params.status);
  }

  const from = (params.page - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  const { data, count, error } = await query
    .order("client_nom", { ascending: true })
    .range(from, to);

  if (error) {
    throw error;
  }

  return {
    data: (data ?? []).map(mapClientDbToUI),
    total: count ?? 0,
  };
}


