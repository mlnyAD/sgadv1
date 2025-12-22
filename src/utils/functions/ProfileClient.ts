// src/utils/functions/ProfileClient.ts
"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

// GET CONNECTED USER (CLIENT)
export async function cliGetUserConnected() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) return { error };
  return { user: data.user };
}

// GET PROFILE BY UUID (CLIENT)
export async function cliGetProfileByUUID(uuid: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error, status } = await supabase
    .from("vw_user_profiles")
    .select("*")
    .eq("id", uuid)
    .single();

  if (error && status !== 406) return { error };
  return { profile: data };
}
