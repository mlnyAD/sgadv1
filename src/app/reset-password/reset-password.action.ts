

"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function resetPasswordAction(newPassword: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { error: pwdError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (pwdError) throw new Error(pwdError.message);

  const admin = await createSupabaseAdminClient();

  const { error: updateError } = await admin
    .from("operateur")
    .update({ must_change_pwd: false })
    .eq("oper_id", user.id);

  if (updateError) throw new Error(updateError.message);

  redirect("/dashboard");
}