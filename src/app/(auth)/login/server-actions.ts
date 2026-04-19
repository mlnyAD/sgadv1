

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerWriteClient } from "@/lib/supabase/server-write";

const CURRENT_CLIENT_COOKIE = "current_clt_id";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createSupabaseServerWriteClient();

  // 1️⃣ Sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return { success: false, error: "Identifiants invalides." };
  }

  // 2️⃣ Get user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Impossible de récupérer l'utilisateur connecté." };
  }

  if (!user.email) {
    return { success: false, error: "Utilisateur sans email." };
  }

  // 3️⃣ Clear current client cookie
  const cookieStore = await cookies();
  cookieStore.delete(CURRENT_CLIENT_COOKIE);

  // 4️⃣ Fetch operateur
  const { data: operateur, error: operateurError } = await supabase
    .from("operateur")
    .select("oper_id, oper_admin_sys")
    .eq("oper_email", user.email)
    .single();

  if (operateurError || !operateur) {
    return { success: false, error: "Opérateur introuvable pour cet utilisateur." };
  }

  // 5️⃣ AdminSys shortcut
  if (operateur.oper_admin_sys) {
    // Adminsys n’a pas de client
    redirect("/dashboard");
  }

  // 6️⃣ Fetch clients for operator
  const { data: memberships, error: membershipsError } = await supabase
    .from("operateur_client")
    .select("clt_id")
    .eq("oper_id", operateur.oper_id);

  if (membershipsError) {
    return { success: false, error: "Impossible de charger les clients associés." };
  }

  const clientIds = [...new Set((memberships ?? []).map((row) => row.clt_id).filter(Boolean))];

  if (clientIds.length === 0) {
    return { success: false, error: "Aucun client n'est associé à ce compte." };
  }

  // 7️⃣ Logic multi-client
  if (clientIds.length === 1) {
    cookieStore.set(CURRENT_CLIENT_COOKIE, String(clientIds[0]), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    redirect("/dashboard");
  }

  // Plusieurs clients → page de sélection
  redirect("/select-client");
}