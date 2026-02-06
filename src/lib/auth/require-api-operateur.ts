

import type { AuthenticatedOperateur } from "@/domain/operateur/authenticated-operateur.interface";
import { mapOperateurDbRowToAuthenticated } from "@/domain/operateur/operateur.mapper";
import { createSupabaseServerReadClient } from "../supabase/server-read";

export async function requireApiOperateur(opts?: { allowMustChangePassword?: boolean }): Promise<AuthenticatedOperateur> {
 
  const supabase = await createSupabaseServerReadClient();

  // 1) Auth Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) throw new Error("UNAUTHORIZED");

  // 2) Lecture opérateur métier
  const { data: op, error: opError } = await supabase
    .from("vw_operateur_view")
    .select("*")
    .eq("oper_id", user.id)
    .maybeSingle();

  if (opError || !op) throw new Error("FORBIDDEN");
  if (!op.oper_actif) throw new Error("FORBIDDEN");

  // 3) Onboarding : bloquer l'API tant que le mot de passe n'est pas changé
  if (op.must_change_pwd && !opts?.allowMustChangePassword) {
    throw new Error("MUST_CHANGE_PASSWORD");
  }

  // 4) Charger périmètre client
  let clientIds: string[] = [];

  if (!op.oper_admin_sys) {
    const { data: links, error: linksError } = await supabase
      .from("operateur_client")
      .select("clt_id")
      .eq("oper_id", op.oper_id);

    if (linksError) throw new Error("FORBIDDEN");

    clientIds = (links ?? []).map((l) => l.clt_id);
  }

  return mapOperateurDbRowToAuthenticated(op, clientIds);
}