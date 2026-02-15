

import { redirect } from "next/navigation";
import type { AuthenticatedOperateur } from "@/domain/operateur/authenticated-operateur.interface";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { getAuthenticatedOperateurByUserId } from "@/domain/operateur/operateur.repository";

export async function requireOperateur(): Promise<AuthenticatedOperateur> {

  const supabase = await createSupabaseServerReadClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");

  const oper = await getAuthenticatedOperateurByUserId(user.id);

  //console.log("RequireOperateur op, user = ", oper, user)

  if (!oper) redirect("/login");

  if (oper.mustChangePassword) redirect("/reset-password");

  return oper;
}