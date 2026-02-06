

// src/domain/operclient/operclient.actions.ts

"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**********************************************
 * Creation                                   *
 * ****************************************** */
export async function createOperClientAssociationAction(params: {
  operateurId: string;
  clientId: string;
}) {
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

/**********************************************
 * Suppression                                *
 * ****************************************** */
export async function deleteOperClientAssociationAction(
  operId: string,
  clientId: string
): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("operateur_client")
    .delete()
    .eq("oper_id", operId)
    .eq("clt_id", clientId);

  if (error) {
    throw new Error(error.message);
  }
}