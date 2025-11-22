// src/utils/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// type pour résoudre cookies() dynamiquement
type MaybePromise<T> = T | Promise<T>;

function isPromise<T>(value: MaybePromise<T>): value is Promise<T> {
  return typeof (value as any)?.then === "function";
}

export async function getSupabaseServerClient() {
  const cookieStore = cookies(); // peut être sync ou async selon le contexte

  let resolvedCookies: Awaited<ReturnType<typeof cookies>>;

  if (isPromise(cookieStore)) {
    resolvedCookies = await cookieStore;
  } else {
    resolvedCookies = cookieStore;
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return resolvedCookies.get(name)?.value ?? "";
        },
        set(_name: string, _value: string, _options: CookieOptions) {
          // Next.js 16 : interdit en RSC. OK uniquement dans middleware / route handlers.
        },
        remove(_name: string, _options: CookieOptions) {
          // idem
        }
      }
    }
  );
}
