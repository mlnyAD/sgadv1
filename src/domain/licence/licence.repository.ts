


import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import { mapLicenceDbToUI, mapLicenceUIToDb } from "./licence.mapper";
import type { LicenceUI } from "./licence.ui";

/* ------------------------------------------------------------------ */
/* LIST */
/* ------------------------------------------------------------------ */

import type { LicenceStatus } from "./licence.catalog";

interface ListLicencesParams {
  page: number;
  pageSize: number;
  search?: string;
  clientId?: string;
  status?: LicenceStatus;
}

export async function listLicences({
  page,
  pageSize,
  search,
  clientId,
  status,
}: ListLicencesParams) {
  const supabase = await createSupabaseServerReadClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("vw_licence")
    .select("*", { count: "exact" })
    .range(from, to);

  if (search) {
    query = query.ilike("nom", `%${search}%`);
  }

  if (clientId) {
    query = query.eq("client_id", clientId);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data, count, error } = await query;

  if (error || !data) {
    throw new Error(error?.message ?? "List licences failed");
  }

  return {
    data: data.map(mapLicenceDbToUI),
    total: count ?? 0,
  };
}

/* ------------------------------------------------------------------ */
/* GET BY ID */
/* ------------------------------------------------------------------ */

export async function getLicenceById(
  id: string
): Promise<LicenceUI | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_licence")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapLicenceDbToUI(data);
}


/* ------------------------------------------------------------------ */
/* GET BY ID */
/* ------------------------------------------------------------------ */

export async function getLicenceByClientId(
  clientId: string
): Promise<LicenceUI | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_licence")
    .select("*")
    .eq("client_id", clientId)
    .single();

  if (error || !data) return null;

  return mapLicenceDbToUI(data);
}

/* ------------------------------------------------------------------ */
/* CREATE */
/* ------------------------------------------------------------------ */

export async function createLicence(
  ui: LicenceUI
): Promise<string> {

  const supabase = await createSupabaseServerActionClient();

  console.log("Create Licence payload avant conversion = ", ui)

  const payload = mapLicenceUIToDb(ui);

  console.log("Create Licence payload après conversion = ", payload)

  const { data, error } = await supabase
    .from("licence")
    .insert(payload)
    .select("licence_id")
    .single();

  console.log("Retour de create data, error", data, error)
  if (error || !data) {
    throw new Error(error?.message ?? "Create licence failed");
  }

  return data.licence_id;
}

/* ------------------------------------------------------------------ */
/* UPDATE */
/* ------------------------------------------------------------------ */

export async function updateLicence(
  id: string,
  ui: LicenceUI
): Promise<void> {
  const supabase = await createSupabaseServerActionClient();

  const payload = mapLicenceUIToDb(ui);

  const { error } = await supabase
    .from("licence")
    .update(payload)
    .eq("licence_id", id);

  if (error) {
    throw new Error(error.message);
  }
}

/* ------------------------------------------------------------------ */
/* DELETE */
/* ------------------------------------------------------------------ */

export async function deleteLicence(
  id: string
): Promise<void> {
  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("licence")
    .delete()
    .eq("licence_id", id);

  if (error) {
    throw new Error(error.message);
  }
}
