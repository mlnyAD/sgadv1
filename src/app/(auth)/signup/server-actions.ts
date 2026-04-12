

"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerWriteClient } from "@/lib/supabase/server-write";

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createSupabaseServerWriteClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Selon ton flow :
  // - soit redirect dashboard
  // - soit page "check email"
  redirect("/dashboard");
}