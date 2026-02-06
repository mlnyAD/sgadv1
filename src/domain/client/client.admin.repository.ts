

// src/domain/client/client.admin.repository.ts

import "server-only";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { ClientView } from "./client-types";
import { mapClientViewRowToUI } from "./client-view-mapper";

export async function listAllClientsAdmin(): Promise<ClientView[]> {
  
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_client_view")
    .select("*")
    .order("clt_nom");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapClientViewRowToUI);
}
