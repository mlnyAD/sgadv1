

// src/domain/licence/licence.repository.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import { mapLicenceDbToUI, mapLicenceUIToDb } from "./licence.mapper";
import { LicenceUI } from "./licence.ui";

/* ------------------------------------------------------------------ */
/* Read */
/* ------------------------------------------------------------------ */
export async function getLicenceByClientId(
  clientId: number
): Promise<LicenceUI | null> {

  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_licence")
    .select(`
      licence_id,
      client_id,
      licence_status,
      licence_start_at,
      licence_end_at,
      lmod
    `)
    .eq("client_id", clientId)
    .single();

  if (error || !data) {
    return null;
  }

  return mapLicenceDbToUI(data);
}

/* ------------------------------------------------------------------ */
/* CREATE */
/* ------------------------------------------------------------------ */
export async function createLicence(
  ui: LicenceUI
): Promise<number> {

  const supabase = await createSupabaseServerActionClient();

  const payload = mapLicenceUIToDb(ui);

  const { data, error } = await supabase
    .from("licence")
    .insert(payload)
    .select("licence_id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Create licence failed");
  }

  return data.licence_id as number;
}
