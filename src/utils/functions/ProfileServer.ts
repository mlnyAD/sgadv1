// src/utils/functions/ProfileServer.ts
"use server";

import { getSupabaseServerClient } from "@/utils/supabase/server";
//import { insertActivite } from "@/utils/functions/ActiviteBD";
import { UserProfileType } from "@/utils/types";

// Helper
async function srv() {
  return await getSupabaseServerClient();
}

// ---------------------------
// GET USER CONNECTED (SERVER)
// ---------------------------
export async function srvGetUserConnected() {
  const supabase = await srv();
  const { data, error } = await supabase.auth.getUser();

  if (error) return { error };
  return { user: data.user };
}

// ---------------------------
// GET PROFILE BY UUID
// ---------------------------
export async function srvGetProfileByUUID(uuid: string): Promise<{
  profile?: UserProfileType;
  error?: Error;
}> {
  const supabase = await srv();

  const { data, error, status } = await supabase
    .from("vw_user_profiles")
    .select("*")
    .eq("id", uuid)
    .single();

  if (error && status !== 406) return { error };
  return { profile: data };
}


// ---------------------------
// UPSERT PROFILE
// ---------------------------
export async function upsertProfile(input: {
  newUserId: number;
  newNom: string;
  newPrenom: string;
  newEmail: string;
  newFonctionId: number;
  newSocieteId: number;
  newUserAvecCompte: boolean;
  newMetierId: number;
  newUUID: string;
}) {
  const supabase = await srv();

  const payload = {
    username: input.newNom,
    userfirstname: input.newPrenom,
    userEmail: input.newEmail,
    fonction_id: input.newFonctionId,
    societe_id: input.newSocieteId,
    pers_avec_cpte: input.newUserAvecCompte,
    metier_id: input.newMetierId,
    id: input.newUUID,
  };

  if (input.newUserId === 0) {
    const { error } = await supabase.from("profiles").insert(payload);

    if (error) return { error };

 /*   await insertActivite({
      actType: "Utilisateur",
      actSType: "Ajout",
      actMessage: input.newNom,
      actUser: "OPE1",
    });*/

    return { message: "success" };
  }

  if (input.newUserId > 0) {
    const { error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("app_id", input.newUserId);

    if (error) return { error };

  /*  await insertActivite({
      actType: "Utilisateur",
      actSType: "Modification",
      actMessage: input.newNom,
      actUser: "OPE1",
    });*/

    return { message: "success" };
  }
}
