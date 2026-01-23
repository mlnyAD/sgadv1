

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import type { AuthenticatedUser } from "./authenticated-user.interface";
import type { ServerUser, UserRoleKey } from "./server-user.type";
import { mapServerUserToAuthenticatedUser } from "./map-server-user";

async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
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
}

export async function loadAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const supabase = await createClient();

  /* ------------------------------------------------------------------ */
  /* Auth                                                               */
  /* ------------------------------------------------------------------ */

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    return null;
  }

  /* ------------------------------------------------------------------ */
  /* Vue métier                                                         */
  /* ------------------------------------------------------------------ */

  const { data: row, error } = await supabase
    .from("vw_operator_view")
    .select("email, role, prenom, nom")
    .eq("email", user.email)
    .maybeSingle();

  if (error || !row) {
    return null;
  }

  /* ------------------------------------------------------------------ */
  /* ServerUser                                                         */
  /* ------------------------------------------------------------------ */

  const serverUser: ServerUser = {
    id: user.id,
    email: row.email,
    role: (row.role as UserRoleKey) ?? "client",
    firstName: row.prenom ?? undefined,
    lastName: row.nom ?? undefined,
  };

  /* ------------------------------------------------------------------ */
  /* Mapping UI                                                         */
  /* ------------------------------------------------------------------ */

  return mapServerUserToAuthenticatedUser(serverUser);
}
