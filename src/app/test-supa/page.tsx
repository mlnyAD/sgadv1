
// src/app/test-supa/page.tsx

export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export default async function TestSupaPage() {
  const cookieStore = cookies(); // ✅ pas async

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        detectSessionInUrl: false,
        storage: {
          async getItem(key) {
            return (await cookieStore).get(key)?.value ?? null;
          },
          setItem() {
            // ❗ côté serveur, on ne peut pas écrire dans les cookies
          },
          removeItem() {
            // idem
          },
        },
      },
    }
  );

  const { data: sessionData } = await supabase.auth.getSession();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Test Supabase</h1>
      <pre className="mt-4 bg-gray-100 p-4 rounded">
        {JSON.stringify(sessionData, null, 2)}
      </pre>
    </div>
  );
}
