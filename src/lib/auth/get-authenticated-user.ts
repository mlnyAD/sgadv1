

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

export async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerReadClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}