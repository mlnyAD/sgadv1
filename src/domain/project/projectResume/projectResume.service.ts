
// /domain/projectResume/projectResume.service.ts

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { ProjectResumeDTO } from "./projectResume.types";

export async function fetchProjectResume(
  projectId: number
): Promise<ProjectResumeDTO | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_project_resume")
    .select(
      `
      project_id,
      project_nom,
      project_ident,
      project_pilote,
      project_descript,
      project_adresse,
      project_code_postal,
      project_ville,
      project_start,
      project_end,
      project_reception_actu,
      project_duree_vie,
      project_photo
    `
    )
    .eq("project_id", projectId)
    .maybeSingle<ProjectResumeDTO>(); // ✅ typage ici

  if (error) throw error;

  return data;
}

