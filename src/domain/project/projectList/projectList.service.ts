

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { ProjectListRow } from "./projectList.types";
import { mapProjectListRow } from "./projectList.mapper";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface ProjectListQuery {
  page: number;
  pageSize: number;
  search?: string;
  statusIds?: number[] | null; // ✅ cumulatif
}

export interface ProjectListResult {
  items: ProjectListRow[];
  totalPages: number;
}

/* ------------------------------------------------------------------ */
/* Service */
/* ------------------------------------------------------------------ */

export async function getProjectList(
  params: ProjectListQuery
): Promise<ProjectListResult> {
  const { page, pageSize, search, statusIds } = params;

  const supabase = await createSupabaseServerReadClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("vw_project_list")
    .select("*", { count: "exact" })
    .order("project_nom")
    .range(from, to);

  // Recherche
  if (search) {
    query = query.ilike("project_nom", `%${search}%`);
  }

  // Filtre état (cumulatif)
  if (statusIds && statusIds.length > 0) {
    query = query.in("project_status_id", statusIds);
  }

  const { data, count, error } = await query;

  if (error) throw error;

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / pageSize));

  return {
    items: (data ?? []).map(mapProjectListRow),
    totalPages,
  };
}
