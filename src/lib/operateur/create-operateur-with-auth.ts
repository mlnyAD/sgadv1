

// src/lib/operateur/create-operateur-with-auth.ts

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function createOperateurWithAuth(email: string): Promise<{
  operId: string;
  tempPassword: string;
}> {
  const supabase = createSupabaseAdminClient();

  const tempPassword = crypto.randomUUID();

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
  });

  if (error || !data.user) {
    throw new Error(`Erreur création Auth: ${error?.message}`);
  }

  return { operId: data.user.id, tempPassword };
}

export async function rollbackOperateurAuth(operId: string): Promise<void> {
  const supabase = createSupabaseAdminClient();
  await supabase.auth.admin.deleteUser(operId);
}