// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { loadAuthenticatedUser } from "@/domain/user/loadAuthenticatedUser";

export async function GET() {
  const cookieStore = await cookies();

  console.log("ME API: cookies sent by browser =", cookieStore.getAll());


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

  // 1) >> Récupération utilisateur AUTH de manière sécurisée <<
  const { data: authData, error: authError } = await supabase.auth.getUser();

  console.log("ME API: auth error =", authError);
console.log("ME API: auth user =", authData?.user);

  if (authError || !authData?.user) {
    console.log("ME API: NO AUTH USER", authError?.message);
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const authUser = authData.user;
  const userId = authUser.id;

  // 2) >> Chargement dans public.user <<
  console.log("ME API: trying DB lookup for userId =", authData.user.id);

  const user = await loadAuthenticatedUser(authData.user.id);

  console.log("ME API: final returned user =", user);

  if (!user) {
    console.log("ME API: USER NOT IN PUBLIC.USER", userId);
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
