

import type { AuthenticatedOperateur } from "@/domain/operateur/authenticated-operateur.interface";
import { mapOperateurDbRowToAuthenticated } from "@/domain/operateur/operateur.mapper";
import { createSupabaseServerReadClient } from "../supabase/server-read";
import { SELECT_OPERATEUR_VIEW } from "@/domain/operateur/operateur.select";
import type { OperateurRow } from "@/domain/_db/rows";

export async function requireApiOperateur(opts?: { allowMustChangePassword?: boolean }): Promise<AuthenticatedOperateur> {
  const supabase = await createSupabaseServerReadClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("UNAUTHORIZED");

  const { data, error: opError } = await supabase
    .from("vw_operateur_view")
    .select(SELECT_OPERATEUR_VIEW)
    .eq("oper_id", user.id)
    .maybeSingle();

  if (opError || !data) throw new Error("FORBIDDEN");

  const op = data as unknown as OperateurRow;

  if (op.oper_actif !== true) throw new Error("FORBIDDEN");

  // ✅ must_change_pwd: boolean|null
  if (op.must_change_pwd === true && !opts?.allowMustChangePassword) {
    throw new Error("MUST_CHANGE_PASSWORD");
  }

  let clientIds: string[] = [];

  if (op.oper_admin_sys !== true) {
    const { data: links, error: linksError } = await supabase
      .from("operateur_client")
      .select("clt_id")
      .eq("oper_id", op.oper_id as string);

    if (linksError) throw new Error("FORBIDDEN");

    clientIds = (links ?? []).map((l) => l.clt_id);
  }

  return mapOperateurDbRowToAuthenticated(op, clientIds);
}