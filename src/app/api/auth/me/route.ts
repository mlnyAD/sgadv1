import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { USER_ROLES } from "@/domain/user/roles/user-role.enum";

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
        }
      }
    }
  );

  // 1) Lecture utilisateur Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  // 2) Lecture dans ta vue vw_operator_list
  const { data: op, error: opError } = await supabase
    .from("vw_operator_list")
    .select("*")
    .eq("email", user.email)
    .maybeSingle();

  if (opError) {
    console.error("vw_operator_list error:", opError);
  }

  // 3) Construction displayName
  const displayName =
    op?.first_name && op?.last_name
      ? `${op.first_name} ${op.last_name}`
      : user.email?.split("@")[0] ?? "Utilisateur";

  // 4) Détermination du rôle
  const roleId = op?.role_id ?? USER_ROLES.USER.id;

  const functionLabel =
    Object.values(USER_ROLES).find((r) => r.id === roleId)?.label ??
    "Utilisateur";

  // 5) Construction de ton AuthenticatedUser
  const result = {
    id: user.id,
    email: user.email,
    displayName,
    welcomeMessage: "Bienvenue",

    isSystemAdmin: roleId === USER_ROLES.SYSTEM_ADMIN.id,
    isClientAdmin: roleId === USER_ROLES.CLIENT_ADMIN.id,
    isProjectAdmin: roleId === USER_ROLES.PROJECT_ADMIN.id,
    isUser: true,

    clientIds: [],   // en attente de ta future table
    projectIds: [],  // idem

    functionLabel,
  };

  return NextResponse.json({ user: result });
}
