

// src/domain/operclient/operclient.repository.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

import type {
  OperClientRow,
  OperateurClientInsert,
} from "@/domain/_db/rows";

import type { OperClientView } from "./operclient-types";
import { mapOperClientRowToView } from "./operclient.mapper";
import { SELECT_OPERCLIENT_VIEW } from "./operclient.select";

/* ------------------------------------------------------------------ */
/* LIST                                                               */
/* ------------------------------------------------------------------ */

export async function listOperClientAssociations(params: {
  page: number;
  pageSize: number;
  operateur?: string;
  client?: string;
  operateurId?: string;
  clientId?: string;
  actifOperateur?: boolean;
  actifClient?: boolean;
}): Promise<{ data: OperClientView[]; total: number }> {
  const supabase = await createSupabaseServerReadClient();
  const {
    page,
    pageSize,
    operateur,
    client,
    operateurId,
    clientId,
    actifOperateur,
    actifClient,
  } = params;

  let query = supabase
    .from("vw_operateur_client_view")
    .select(SELECT_OPERCLIENT_VIEW, { count: "exact" })
    .order("oper_nom")
    .order("clt_nom");

  if (operateurId) query = query.eq("oper_id", operateurId);
  if (clientId) query = query.eq("clt_id", clientId);

  if (actifOperateur !== undefined) query = query.eq("oper_actif", actifOperateur);
  if (actifClient !== undefined) query = query.eq("clt_actif", actifClient);

  if (operateur) {
    query = query.or(`oper_nom.ilike.%${operateur}%,oper_email.ilike.%${operateur}%`);
  }
  if (client) {
    query = query.ilike("clt_nom", `%${client}%`);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as unknown as OperClientRow[];
  return {
    data: rows.map(mapOperClientRowToView),
    total: count ?? 0,
  };
}

/* ------------------------------------------------------------------ */
/* GET                                                                */
/* ------------------------------------------------------------------ */

export async function getOperClientAssociationById(id: string): Promise<OperClientView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_operateur_client_view")
    .select(SELECT_OPERCLIENT_VIEW)
    .eq("opcl_id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const row = data as OperClientRow | null;
  return row ? mapOperClientRowToView(row) : null;
}

/* ------------------------------------------------------------------ */
/* UPSERT (IDEMPOTENT)                                                */
/* ------------------------------------------------------------------ */

export async function upsertOperClientAssociation(params: {
  operateurId: string;
  clientId: string;
}): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const payload: OperateurClientInsert = {
    oper_id: params.operateurId,
    clt_id: params.clientId,
  };

  const { error } = await supabase
    .from("operateur_client")
    .upsert(payload, { onConflict: "oper_id,clt_id" });

  if (error) throw new Error(error.message);
}

/* ------------------------------------------------------------------ */
/* DELETE                                                             */
/* ------------------------------------------------------------------ */

export async function deleteOperClientAssociationById(opclId: string): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase.from("operateur_client").delete().eq("opcl_id", opclId);
  if (error) throw new Error(error.message);
}

export async function deleteOperClientAssociationByKeys(params: {
  operateurId: string;
  clientId: string;
}): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("operateur_client")
    .delete()
    .eq("oper_id", params.operateurId)
    .eq("clt_id", params.clientId);

  if (error) throw new Error(error.message);
}