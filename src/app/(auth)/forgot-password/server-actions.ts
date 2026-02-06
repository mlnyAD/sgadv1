

"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requestPasswordResetAction(email: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const redirectTo = `${origin}/auth/callback?next=/reset-password`;

  await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  // on ne throw pas : UX neutre
}