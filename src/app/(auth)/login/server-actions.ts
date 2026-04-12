

"use server";

import { redirect } from "next/navigation";
import { getSiteUrl } from "@/helpers/getSiteUrl";
import { createSupabaseServerWriteClient } from "@/lib/supabase/server-write";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // IMPORTANT : write client pour poser les cookies de session
  const supabase = await createSupabaseServerWriteClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: "Identifiants invalides." };
  }

  redirect("/dashboard");
}

export async function requestPasswordReset(email: string) {
  const supabase = await createSupabaseServerReadClient();

  const origin = getSiteUrl();
  const redirectTo = `${origin}/auth/callback?next=/reset-password`;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) throw new Error(error.message);
}