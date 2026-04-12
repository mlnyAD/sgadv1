

// src/lib/supabase/server-read.ts

// Client serveur pour lire la session et interroger Supabase
// sans persister de cookies.
// À utiliser dans les Server Components et helpers de lecture.

import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/database.types";
import { env } from "@/lib/env";

export async function createSupabaseServerReadClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Intentionnelle : ce client ne doit pas persister
          // de cookies de session.
        },
      },
    }
  );
}