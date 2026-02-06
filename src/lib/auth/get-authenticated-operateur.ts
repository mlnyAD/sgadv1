

// src/lib/auth/get-authenticated-operateur.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { mapOperateurDbRowToAuthenticated } from "@/domain/operateur/operateur.mapper";
import type { AuthenticatedOperateur } from "@/domain/operateur/authenticated-operateur.interface";

export async function getAuthenticatedOperateur(): Promise<AuthenticatedOperateur | null> {
  const supabase = await createSupabaseServerReadClient(); // ✅ read-only

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: operRow } = await supabase
    .from("vw_operateur_view")
    .select("*")
    .eq("oper_id", user.id)
    .maybeSingle();

  if (!operRow || !operRow.oper_actif) return null;

  let clientIds: string[] = [];
  if (!operRow.oper_admin_sys) {
    const { data: links } = await supabase
      .from("operateur_client")
      .select("clt_id")
      .eq("oper_id", operRow.oper_id);

    clientIds = (links ?? []).map((l) => l.clt_id);
  }

  return mapOperateurDbRowToAuthenticated(operRow, clientIds);
}