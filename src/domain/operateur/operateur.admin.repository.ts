

// src/domain/operateur/operateur.admin.repository.ts

import "server-only";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { OperateurView } from "./operateur-types";
import { mapOperateurRowToView } from "./operateur.mapper";

export async function listAllOperateursAdmin(): Promise<OperateurView[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_operateur_view")
    .select("*")
    .order("oper_nom");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapOperateurRowToView);
}
