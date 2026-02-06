

"use server";


import { requireOperateur } from "@/lib/auth/require-operateur";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Force un opérateur à réinitialiser son mot de passe au prochain login.
 * Réservé aux admin_sys.
 */
export async function resetOperateurPasswordAction(
  operateurId: string
): Promise<void> {
  // 1) Auth + autorisation
  const currentOperateur = await requireOperateur();

  if (!currentOperateur.isAdminSys) {
    throw new Error("Accès refusé");
  }

  // 2) Update métier (PAS Supabase Auth)
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("operateur")
    .update({ must_change_pwd: true })
    .eq("oper_id", operateurId);

  if (error) {
    throw new Error(error.message);
  }
}
