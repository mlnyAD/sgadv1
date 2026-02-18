

// src/lib/auth/get-authenticated-operateur.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { mapOperateurDbRowToAuthenticated } from "@/domain/operateur/operateur.mapper";
import type { AuthenticatedOperateur } from "@/domain/operateur/authenticated-operateur.interface";
import { SELECT_OPERATEUR_VIEW } from "@/domain/operateur/operateur.select";
import type { OperateurRow } from "@/domain/_db/rows";

export async function getAuthenticatedOperateur(): Promise<AuthenticatedOperateur | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data, error: opError } = await supabase
    .from("vw_operateur_view")
    .select(SELECT_OPERATEUR_VIEW)
    .eq("oper_id", user.id)
    .maybeSingle();

  if (opError || !data) return null;

  const operRow = data as unknown as OperateurRow;

  // ✅ bool | null => strict
  if (operRow.oper_actif !== true) return null;

  let clientIds: string[] = [];

  // ✅ adminsys uniquement si === true
  if (operRow.oper_admin_sys !== true) {
    const { data: links, error: linksError } = await supabase
      .from("operateur_client")
      .select("clt_id")
      .eq("oper_id", operRow.oper_id as string);

    if (linksError) return null;

    clientIds = (links ?? []).map((l) => l.clt_id);
  }

  return mapOperateurDbRowToAuthenticated(operRow, clientIds);
}