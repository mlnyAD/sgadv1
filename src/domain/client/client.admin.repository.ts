

// src/domain/client/client.admin.repository.ts

import "server-only";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

import type { ClientView } from "./client-types";
import type { ClientRow } from "@/domain/_db/rows";
import { mapClientRowToView } from "./client-mapper";
import { SELECT_CLIENT_VIEW } from "@/domain/client/client.select";

export async function listAllClientsAdmin(): Promise<ClientView[]> {
  const supabase = await createSupabaseServerReadClient();

const { data, error } = await supabase
  .from("vw_client_view")
  .select(SELECT_CLIENT_VIEW)
  .returns<ClientRow[]>()
  .order("clt_nom");
  
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as ClientRow[];
  return rows.map(mapClientRowToView);
}