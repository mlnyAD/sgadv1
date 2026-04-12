

// src/lib/supabase/server.ts

import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/env";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),

        // IMPORTANT: en Server Component, Next interdit cookies().set()
        // Donc on rend setAll inoffensif (dashboard = lecture)
        setAll: () => {},
      },

      // IMPORTANT: évite toute tentative de refresh / persist cookie
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  );
}