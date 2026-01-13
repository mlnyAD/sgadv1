

import type { DbLotTrav } from "./lottrav-db.interface";
import type { LotTravView } from "./lottrav-view.interface";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import { mapDbLotTravToView } from "./lotttrav.mapper";



export async function listProjectContacts() {

  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_operator_view")
    .select("operator_id, email")
    
    .order("email");

  if (error) {
    throw error;
  }

  return data.map((c) => ({
    id: c.operator_id,
    label: c.email,
  }));
}

/**********************************************************
 * Liste paginée des lots d'un projet
 **********************************************************/
export async function listLotTravByProject(
  params: {
    projectId: number;
    page: number;
    pageSize: number;
    search?: string;
    statusId?: number;
  }
): Promise<{
  data: LotTravView[];
  total: number;
}> {
  const {
    projectId,
    page,
    pageSize,
    search,
    statusId,
  } = params;

  const supabase = await createSupabaseServerReadClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("vw_lottrav_with_operator")
    .select("*", { count: "exact" })
    .eq("project_id", projectId);

  /* -------------------- Filtres -------------------- */

  if (search) {
    query = query.ilike(
      "lottrav_nom",
      `%${search}%`
    );
  }

  if (typeof statusId === "number") {
    query = query.eq(
      "lottrav_status_id",
      statusId
    );
  }

  /* -------------------- Pagination & tri -------------------- */

  const { data, error, count } = await query
    .order("lottrav_start", { ascending: true })
    .range(from, to);

  if (error) {
    throw error;
  }

  return {
    data: (data ?? []).map(
      mapDbLotTravToView
    ),
    total: count ?? 0,
  };
}

/**********************************************************
 * Lecture d'un lot d'un projet
 **********************************************************/
export async function getLotTravById(
  lottravId: number
): Promise<LotTravView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_lottrav_with_operator")
    .select("*")
    .eq("lottrav_id", lottravId)
    .single();

  if (error) {
    return null;
  }

  return mapDbLotTravToView(data);
}


/**********************************************************
 * Création d'un lot d'un projet
 **********************************************************/
export async function createLotTrav(
  projectId: number,
  payload: {
    lottrav_nom: string;
    lottrav_start: string | null;
    lottrav_end: string | null;
    lottrav_status_id: number;
  }
): Promise<DbLotTrav> {
  const supabase = await createSupabaseServerActionClient();

  console.log("CREATE lottrav payload", {
  projectId,

  payload,
});

  console.log("Create lot payload ", payload);
    console.log("Create lot projectId ", projectId)

  const { data, error } = await supabase
    .from("lottrav")
    .insert({
      project_id: projectId,
      ...payload,
    })
    .select()
    .single();

  console.log("Create lot error ", error)

  if (error) {
    
  console.log("Create lot error ", error)
     throw error;
    }
  console.log("Retour de create lot data ", data)

  return data;
}
/**********************************************************
 * Update d'un lot d'un projet
 **********************************************************/

export async function updateLotTrav(
  projectId: number,
  lottravId: number,
  payload: {
    lottrav_nom: string;
    lottrav_start: string | null;
    lottrav_end: string | null;
    lottrav_status_id: number;
  }
): Promise<DbLotTrav> {
  const supabase = await createSupabaseServerActionClient();

  console.log(" UPDATE lottrav payload", {
  projectId,
  lottravId,
  payload,
});

  const { data, error } = await supabase
    .from("lottrav")
    .update(payload)
    .eq("lottrav_id", lottravId)
    .eq("project_id", projectId) // 🔐 garde métier
    .select()
    .single();

    console.log("UpdateLottrav", error)
  if (error) throw error;

  return data;
}



/**********************************************************
 * Delete d'un lot d'un projet
 **********************************************************/
export async function deleteLotTrav(
  lottravId: number
): Promise<void> {
  
  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("lottrav")
    .delete()
    .eq("lottrav_id", lottravId);

  if (error) {
    throw error;
  }
}