



import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";

import { TaskDbRow, TaskDbViewRow } from "./task.db";

/* ------------------------------------------------------------------
   Lecture – vue vw_task
   ------------------------------------------------------------------ */

export async function getTaskDbViewById(
  taskId: number
): Promise<TaskDbViewRow | null> {

  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
	.from("vw_task")
	.select("*")
	.eq("task_id", taskId)
	.single();


  if (error) {
	throw error;
  }

   // console.log("Retour getTskDBviewbyId ", data)
  return data as TaskDbViewRow;
}

/* ------------------------------------------------------------------
   Écriture – table task
   ------------------------------------------------------------------ */

export async function createTask(
  row: TaskDbRow
): Promise<void> {

  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
	.from("task")
	.insert({
	  ...row,
	});

  if (error) {
	throw error;
  }
}

export async function updateTask(
  taskId: number,
  row: Partial<TaskDbRow>
): Promise<void> {
  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
	.from("task")
	.update({
	  ...row,
	  lmod: new Date().toISOString(),
	})
	.eq("task_id", taskId);

  if (error) {
	throw error;
  }
}
