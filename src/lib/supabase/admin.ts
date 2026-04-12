

// src/lib/supabase/admin.ts

import "server-only";

import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export function createSupabaseAdminClient() {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) throw new Error("Supabase admin env variables missing");

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}