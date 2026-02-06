// src/features/operclient/operclient-action.ts
"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";


/**
 * Association opérateur <-> client
 * (table: operateur_client)
 *
 * Note: on garde volontairement cette action "fine" et indépendante de l'opérateur.
 * Les contrôles de droits (admin sys) seront ajoutés ensuite via requireApiAdmin/requireAdminSys.
 */
export async function saveOperClient(params: {
  operateurId: string;
  clientId: string;
}): Promise<void> {
  const { operateurId, clientId } = params;

  if (!operateurId || !clientId) {
    throw new Error("operateurId et clientId sont requis");
  }

  const supabase = await createSupabaseAdminClient();

  // Insert idempotent (Supabase/Postgres): si vous avez une contrainte unique (oper_id, clt_id),
  // alors utilisez upsert pour éviter les doublons.
  const { error } = await supabase
    .from("operateur_client")
    .upsert(
      { oper_id: operateurId, clt_id: clientId },
      { onConflict: "oper_id,clt_id" }
    );

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Suppression de l'association opérateur <-> client
 */
export async function deleteOperClient(params: {
  operateurId: string;
  clientId: string;
}): Promise<void> {
  const { operateurId, clientId } = params;

  if (!operateurId || !clientId) {
    throw new Error("operateurId et clientId sont requis");
  }

  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("operateur_client")
    .delete()
    .eq("oper_id", operateurId)
    .eq("clt_id", clientId);

  if (error) {
    throw new Error(error.message);
  }
}