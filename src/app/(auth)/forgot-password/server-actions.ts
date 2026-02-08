

"use server";

import { getSiteUrl } from "@/helpers/getSiteUrl";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requestPasswordResetAction(email: string): Promise<void> {

  const supabase = await createSupabaseServerClient();

  const origin = getSiteUrl();
  const redirectTo = `${origin}/auth/callback?next=/reset-password`;

  await supabase.auth.resetPasswordForEmail(email, { redirectTo });

}

/*
Pour ne pas te laisser avec un piège sur le reset au prochain déploiement, garde juste ces 3 points en tête :

Sur Vercel, ce sont les Environment Variables du projet qui comptent (Prod/Preview), pas ton .env.production local.

Vérifie que SITE_URL est bien définie au bon scope (Production si tu déploies prod).

Côté Supabase, assure-toi que l’URL de redirection (ton domaine + /auth/callback) est autorisée dans la liste 
des redirect URLs, sinon le reset échoue même si SITE_URL est correct.
*/