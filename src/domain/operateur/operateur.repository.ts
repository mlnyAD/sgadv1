

// src/domain/operateur/operateur.repository.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { OperateurView } from "./operateur-types";
import { mapOperateurRowToView } from "./operateur.mapper";
import type { AuthenticatedOperateur } from "./authenticated-operateur.interface";
import { mapOperateurDbRowToAuthenticated } from "./operateur.mapper";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";


/* ------------------------------------------------------------------ */
/* LIST                                                               */
/* ------------------------------------------------------------------ */
export async function listOperateurs(params: {
  page: number;
  pageSize: number;
  actif?: boolean;
}) {
  const { page, pageSize, actif } = params;

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_operateur_view")
    .select("*", { count: "exact" })
    .order("oper_nom");

  if (actif !== undefined) {
    query = query.eq("oper_actif", actif);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);

  return {
    data: (data ?? []).map(mapOperateurRowToView),
    total: count ?? 0,
  };
}

/* ------------------------------------------------------------------ */
/* READ                                                               */
/* ------------------------------------------------------------------ */
export async function getOperateurById(operId: string): Promise<OperateurView | null> {

  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_operateur_view")
    .select("*")
    .eq("oper_id", operId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data ? mapOperateurRowToView(data) : null;
}

/* ------------------------------------------------------------------ */
/* READ by email (optionnel)                                           */
/* ------------------------------------------------------------------ */
export async function getOperateurByEmail(email: string): Promise<OperateurView | null> {
  
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_operateur_view")
    .select("*")
    .eq("oper_email", email)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data ? mapOperateurRowToView(data) : null;
}

/* ------------------------------------------------------------------ */
/* CREATE (table)                                                     */
/* ------------------------------------------------------------------ */
export async function createOperateur(operateur: OperateurView): Promise<void> {

  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase.from("operateur").insert({
    oper_id: operateur.id,
    oper_email: operateur.email,
    oper_nom: operateur.nom,
    oper_prenom: operateur.prenom,
    oper_admin_sys: operateur.isAdminSys,          // ✅ nom DB
    oper_actif: operateur.actif,                   // ✅ nom DB
    must_change_pwd: operateur.mustChangePassword, // ✅ nom DB
  });

  if (error) throw new Error(error.message);
}

/* ------------------------------------------------------------------ */
/* UPDATE (table)                                                     */
/* - Ne touche pas must_change_pwd (onboarding / reset dédié)          */
/* ------------------------------------------------------------------ */
export async function updateOperateur(operateurId: string, operateur: OperateurView): Promise<void> {

  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("operateur")
    .update({
      oper_email: operateur.email,
      oper_nom: operateur.nom,
      oper_prenom: operateur.prenom,
      oper_admin_sys: operateur.isAdminSys,
      oper_actif: operateur.actif,
      // must_change_pwd volontairement NON modifié ici
    })
    .eq("oper_id", operateurId);

  if (error) throw new Error(error.message);
}

// --- SESSION / AUTHENTICATED OPERATEUR --------------------------------

export async function getAuthenticatedOperateurByUserId(
  userId: string
): Promise<AuthenticatedOperateur | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data: operRow, error: opError } = await supabase
    .from("vw_operateur_view")
    .select("*")
    .eq("oper_id", userId)
    .maybeSingle();

  if (opError || !operRow) return null;
  if (!operRow.oper_actif) return null;

  let clientIds: string[] = [];

  if (!operRow.oper_admin_sys) {
    const { data: links, error: linksError } = await supabase
      .from("operateur_client")
      .select("clt_id")
      .eq("oper_id", operRow.oper_id);

    if (linksError) return null;

    clientIds = (links ?? []).map((l) => l.clt_id);
  }

  return mapOperateurDbRowToAuthenticated(operRow, clientIds);
}


