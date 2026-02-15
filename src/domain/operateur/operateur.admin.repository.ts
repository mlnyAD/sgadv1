

// src/domain/operateur/operateur.admin.repository.ts

import "server-only";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { OperateurView } from "./operateur-types";
import { mapOperateurRowToView } from "./operateur.mapper";
import { SELECT_OPERATEUR_VIEW } from "./operateur.select";
import type { OperateurRow } from "@/domain/_db/rows";

export async function listAllOperateursAdmin(): Promise<OperateurView[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_operateur_view")
    .select(SELECT_OPERATEUR_VIEW)
    .order("oper_nom", { ascending: true, nullsFirst: false });

  if (error) {
    throw new Error(error.message);
  }

const rows = (data ?? []) as unknown as OperateurRow[];

return rows.map(mapOperateurRowToView);

}
