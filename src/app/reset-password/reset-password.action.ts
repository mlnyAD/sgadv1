

"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function resetPasswordAction(newPassword: string) {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error: pwdError } = await supabase.auth.updateUser({ password: newPassword });
  if (pwdError) throw new Error(pwdError.message);

  // métier : lever le flag
  const admin = createSupabaseAdminClient();
  await admin.from("operateur").update({ must_change_pwd: false }).eq("oper_id", user.id);

  redirect("/dashboard");
}