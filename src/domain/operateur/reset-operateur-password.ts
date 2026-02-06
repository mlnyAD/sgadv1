

// src/domain/operateur/reset-operateur-password.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

export async function resetOperateurPassword(
  operateurId: string
): Promise<void> {
  const supabase = await createSupabaseServerReadClient();

  const { error } = await supabase
    .from("operateur")
    .update({ must_change_pwd: true })
    .eq("oper_id", operateurId);

  if (error) {
    throw new Error(error.message);
  }
}
