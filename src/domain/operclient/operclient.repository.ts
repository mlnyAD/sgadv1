

// src/domain/operclient/operclient.repository.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { OperClientView } from "./operclient-types";
import { mapOperClientRowToView } from "./operclient.mapper";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/* ------------------------------------------------------------------ */
/* LIST                                                               */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/* LIST                                                               */
/* ------------------------------------------------------------------ */
export async function listOperClientAssociations(params: {
  page: number;
  pageSize: number;
  operateur?: string;
  client?: string;
}) {
  const { page, pageSize, operateur, client } = params;

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_operateur_client_view")
    .select("*", { count: "exact" })
    .order("oper_nom")
    .order("clt_nom");

  /* -------------------- Filtres texte -------------------- */

  if (operateur) {
    query = query.or(
      `oper_nom.ilike.%${operateur}%,oper_email.ilike.%${operateur}%`
    );
  }

  if (client) {
    query = query.ilike("clt_nom", `%${client}%`);
  }

  /* -------------------- Pagination -------------------- */

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: (data ?? []).map(mapOperClientRowToView),
    total: count ?? 0,
  };
}

/* ------------------------------------------------------------------ */
/* READ                                                               */
/* ------------------------------------------------------------------ */
export async function getOperClientAssociationById(
  id: string
): Promise<OperClientView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_operateur_client_view")
    .select("*")
    .eq("operclt_id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapOperClientRowToView(data) : null;
}

/* ------------------------------------------------------------------ */
/* CREATE                                                             */
/* ------------------------------------------------------------------ */
export async function createOperClientAssociation(params: {
  operateurId: string;
  clientId: string;
}): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("operateur_client")
    .insert({
      oper_id: params.operateurId,
      clt_id: params.clientId,
    });

  if (error) {
    throw new Error(error.message);
  }
}

/* ------------------------------------------------------------------ */
/* DELETE                                                             */
/* ------------------------------------------------------------------ */
export async function deleteOperClientAssociation(
  id: string
): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("operateur_client")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
