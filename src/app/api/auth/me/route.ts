

// src/api/auth/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { ServerUser, UserRoleKey } from "@/domain/user/server-user.type";

export async function GET() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  /* ------------------------------------------------------------------ */
  /* 1) Auth Supabase                                                    */
  /* ------------------------------------------------------------------ */

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  /* ------------------------------------------------------------------ */
  /* 2) Lecture vue métier                                               */
  /* ------------------------------------------------------------------ */

  const { data: op, error: opError } = await supabase
    .from("vw_operator_view")
    .select(`
      role,
      prenom,
      nom,
      email,
      actif
    `)
    .eq("email", user.email)
    .maybeSingle();

  if (opError) {
    console.error("vw_operator_view error:", opError);
  }

  const role: UserRoleKey = op?.role === "admin" ? "admin" : "client";

  /* ------------------------------------------------------------------ */
  /* 3) Construction ServerUser                                         */
  /* ------------------------------------------------------------------ */

  const result: ServerUser = {
  id: user.id,
  email: user.email ?? "",

  role, // ← clé fonctionnelle directe

  firstName: op?.prenom ?? undefined,
  lastName: op?.nom ?? undefined,

};

  return NextResponse.json({ user: result });
}
