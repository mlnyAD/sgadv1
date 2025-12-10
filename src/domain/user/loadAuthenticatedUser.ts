import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { AuthenticatedUser } from "./authenticated-user.interface";

async function createClient() {
  const cookieStore = await cookies(); // ← IMPORTANT : await obligatoire

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

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    console.error("loadAuthenticatedUser: getUser error", authError);
    return null;
  }

  const { data: row, error } = await supabase
    .from("vw_operator_list")
    .select("*")
    .eq("email", user.email)
    .maybeSingle();

  if (error) {
    console.error("loadAuthenticatedUser: error loading operator", error);
    return null;
  }

  if (!row) return null;

  const displayName =
    `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim() ||
    user.email.split("@")[0] ||
    "Utilisateur";

  let functionLabel = row.metier_label || "Utilisateur";

  switch (row.role_id) {
    case 1:
      functionLabel = "Administrateur système";
      break;
    case 2:
      functionLabel = "Administrateur client";
      break;
    case 3:
      functionLabel = "Administrateur projet";
      break;
  }

  const result: AuthenticatedUser = {
    id: row.id,
    email: row.email,
    displayName,
    welcomeMessage: "Bienvenue",

    isSystemAdmin: row.role_id === 1,
    isClientAdmin: row.role_id === 2,
    isProjectAdmin: row.role_id === 3,
    isUser: true,

    clientIds: [],
    projectIds: [],

    functionLabel,
  };

  return result;
}
