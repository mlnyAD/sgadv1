// src/utils/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getSupabaseServerClient() {
  const cookieStore = await cookies(); // async dans votre cas

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          // Next 16 : set cookie seulement dans Route Handler ou middleware
        },
        remove: (name: string, options: CookieOptions) => {
          // idem
        }
      }
    }
  );
}
