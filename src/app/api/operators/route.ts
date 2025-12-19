import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/utils/supabase/admin";
import { getSupabaseServerClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();      // DB
  const supabaseAdmin = getSupabaseAdminClient();        // AUTH

  const body = await request.json();

  const {
    email,
    first_name,
    last_name,
    role_id,
    active,
    societe_id,
    metier_id,
  } = body;

  /* ============================
     1. Création Auth User (ADMIN)
     ============================ */
  const { data: authUser, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
    });

  if (authError || !authUser.user) {
    console.error("AUTH USER CREATE ERROR", authError);
    return NextResponse.json(
      { error: authError?.message ?? "Erreur création utilisateur" },
      { status: 400 }
    );
  }

  const userId = authUser.user.id;

  /* ============================
     2. Création USER métier
     ============================ */
  const { error: userError } = await supabase
    .from("user")
    .insert({
      id: userId,
      email,
      first_name,
      last_name,
    });

  if (userError) {
    await supabaseAdmin.auth.admin.deleteUser(userId);
    return NextResponse.json(
      { error: userError.message },
      { status: 400 }
    );
  }

  /* ============================
     3. Création OPERATOR
     ============================ */
  const { error: operatorError } = await supabase
    .from("operator")
    .insert({
      user_id: userId,
      role_id,
      active,
      societe_id,
      metier_id,
    });

  if (operatorError) {
    await supabase.from("user").delete().eq("id", userId);
    await supabaseAdmin.auth.admin.deleteUser(userId);
    return NextResponse.json(
      { error: operatorError.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}