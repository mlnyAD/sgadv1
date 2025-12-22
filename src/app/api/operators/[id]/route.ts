import { NextResponse } from "next/server";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";


export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const operatorId = Number(id);

  if (!operatorId) {
    return NextResponse.json(
      { error: "Invalid operator id" },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_operator_list")
    .select(`
    operator_id,
    user_id,
    email,
    first_name,
    last_name,
    role_id,
    active,
    societe_id,
    metier_id
  `)
    .eq("operator_id", operatorId)
    .single();


  console.log("Get Operator ", data);


  if (error || !data) {
    return NextResponse.json(
      { error: "Operator not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

/* ******************************** */
/* PUT – Update / Activate / Disable */
/* ******************************** */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createSupabaseServerReadClient(); // DB (RLS)
  const supabaseAdmin = getSupabaseAdminClient();     // Auth admin

  const body = await request.json();

  const {
    operator_id,
    user_id,
    email,
    first_name,
    last_name,
    role_id,
    active,
    societe_id,
    metier_id,
  } = body;

  if (!user_id) {
    return NextResponse.json(
      { error: "user_id manquant" },
      { status: 400 }
    );
  }

  /* ============================
     1. Update USER métier
     ============================ */
  const { error: userError } = await supabase
    .from("user")
    .update({
      email,
      first_name,
      last_name,
    })
    .eq("id", user_id);

  if (userError) {
    console.error("USER UPDATE ERROR", userError);
    return NextResponse.json(
      { error: userError.message },
      { status: 400 }
    );
  }

  /* ============================
     2. Update OPERATOR
     ============================ */
  const { error: operatorError } = await supabase
    .from("operator")
    .update({
      role_id,
      active,
      societe_id,
      metier_id,
    })
    .eq("operator_id", operator_id ?? Number(id));

  if (operatorError) {
    console.error("OPERATOR UPDATE ERROR", operatorError);
    return NextResponse.json(
      { error: operatorError.message },
      { status: 400 }
    );
  }

  /* ============================
     3. Gestion accès AUTH (niveau 1)
     ============================ */
  if (active === false) {
    // 3.a Bloquer toute future connexion
    await supabaseAdmin.auth.admin.updateUserById(user_id, {
      ban_duration: "87600h", // ~10 ans
    });

    // 3.b Invalider immédiatement toutes les sessions
    // (selon version SDK, cette méthode peut s'appeler invalidateUserSessions)
    await supabaseAdmin.auth.admin.signOut(user_id);
  }

  if (active === true) {
    // Réactivation : lever le ban
    await supabaseAdmin.auth.admin.updateUserById(user_id, {
      ban_duration: "0h",
    });
  }

  return NextResponse.json({ success: true });
}
