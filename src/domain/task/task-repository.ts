


import type { TaskView } from "./task-view";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import { mapDbTaskToView } from "./task-mapper";
import { CreateTaskInput, TaskPersistencePayload } from "./task-types";


/* ------------------------------------------------------------------
   Lecture – vue vw_operator_view  --> A factoriser
   ------------------------------------------------------------------ */

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
 * Liste paginée des tâches d'un lot
 **********************************************************/
/**********************************************************
 * Liste paginée des tâches d'un lot
 **********************************************************/
export async function listTaskByLotTrav(params: {
  lotTravId: number;
  page: number;
  pageSize: number;
  search?: string;
  etatId?: number;
}): Promise<{
  data: TaskView[];
  total: number;
}> {
  const { lotTravId, page, pageSize, search, etatId } = params;

  const supabase = await createSupabaseServerReadClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // 🔒 Initialisation unique
  let query = supabase
    .from("vw_task_with_operator")
    .select("*", { count: "exact" })
    .eq("lottrav_id", lotTravId);

  // 🔎 Recherche
  if (search) {
    query = query.ilike("task_nom", `%${search}%`);
  }

  // 🔽 Filtre état
  if (typeof etatId === "number") {
    query = query.eq("task_etat_id", etatId);
  }

  const { data, error, count } = await query
    .order("task_start", { ascending: true })
    .range(from, to);

  if (error) {
    throw error;
  }

  return {
    data: (data ?? []).map(mapDbTaskToView),
    total: count ?? 0,
  };
}


/* ------------------------------------------------------------------
   Lecture – vue d'une tâche
   ------------------------------------------------------------------ */

export async function getTaskById(
  taskId: number
): Promise<TaskView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_task_with_operator")
    .select("*")
    .eq("task_id", taskId)
    .single();

  if (error || !data) {
    return null;
  }

  return mapDbTaskToView(data);
}


/* ------------------------------------------------------------------
    Création d'une tâche
   ------------------------------------------------------------------ */
export async function createTask(
  projectId: number,
  lottravId: number,
  task: CreateTaskInput
): Promise<void> {

  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("task")
    .insert({
  project_id: projectId,
  lottrav_id: lottravId,
      ...task,
    });

  if (error) {
    throw error;
  }
}


/**********************************************************
 * Update d'une tâche d'un projet
 **********************************************************/
export async function updateTask(
  projectId: number,
  lottravId: number,
  taskId: number,
  payload: TaskPersistencePayload
): Promise<TaskView> {
 
  const supabase = await createSupabaseServerActionClient();

  const { data, error } = await supabase
    .from("task")
    .update(payload)
    .eq("task_id", taskId)
    .eq("lottrav_id", lottravId)
    .eq("project_id", projectId) 
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapDbTaskToView(data);
}

/**********************************************************
 * Delete d'une tâche d'un projet
 **********************************************************/
export async function deleteTask(
  projectId: number,
  lottravId: number,
  taskId: number
): Promise<void> {

  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("task")
    .delete()
    .eq("lottrav_id", lottravId)
    .eq("project_id", projectId)
    .eq("task_id", taskId);

  if (error) {
    throw error;
  }
}

