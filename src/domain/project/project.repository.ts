

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import type { ProjectDbRow } from "./project.db";
import type { ProjectDbViewRow } from "./project.mapper";

/* ------------------------------------------------------------------
   Lecture – vue vw_project
   ------------------------------------------------------------------ */

export async function getProjectDbViewById(
  projectId: number
): Promise<ProjectDbViewRow | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_project_list")
    .select("*")
    .eq("project_id", projectId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }

  return data as ProjectDbViewRow;
}

/* ------------------------------------------------------------------
   Écriture – table project
   ------------------------------------------------------------------ */

export async function createProject(
  row: ProjectDbRow
): Promise<void> {
  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("project")
    .insert({
      ...row,
      project_creation: row.project_creation ?? new Date().toISOString(),
    });

  if (error) {
    throw error;
  }
}

export async function updateProject(
  projectId: number,
  row: Partial<ProjectDbRow>
): Promise<void> {
  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("project")
    .update({
      ...row,
      lmod: new Date().toISOString(),
    })
    .eq("project_id", projectId);

  if (error) {
    throw error;
  }
}
