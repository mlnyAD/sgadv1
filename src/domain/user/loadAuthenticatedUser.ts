// src/domain/user/loadAuthenticatedUser.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { AuthenticatedUser } from "./authenticated-user.interface";

export async function loadAuthenticatedUser(userId: string): Promise<AuthenticatedUser | null> {
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

  const { data: row } = await supabase
    .from("user")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (!row) {
    console.log("loadAuthenticatedUser: no row in public.user for", userId);
    return null;
  }

  const displayName =
    `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim() || row.email;

  return {
    id: row.id,
    email: row.email,
    displayName,
    isSystemAdmin: row.is_system_admin ?? false,
    isClientAdmin: row.is_client_admin ?? false,
    isProjectAdmin: row.is_project_admin ?? false,
    isUser: true,
    clientIds: [],
    projectIds: [],
    welcomeMessage: `Bienvenue ${displayName}`,
  };
}
