


// projects/components/form/project.form.mapper.ts

import type { ProjectDbRow } from "@/domain/project/project.db";
import type { ProjectFormState } from "./project.form.types";

export function mapProjectFormToDb(
  project: ProjectFormState
): ProjectDbRow {
  return {
    ...project,
    project_moa_id: project.project_moa_id
      ? Number(project.project_moa_id)
      : null,
    project_ouvrage_id: project.project_ouvrage_id
      ? Number(project.project_ouvrage_id)
      : null,
    project_motif_id: project.project_motif_id
      ? Number(project.project_motif_id)
      : null,
    project_budget_id: project.project_budget_id
      ? Number(project.project_budget_id)
      : null,
  };
}

export function mapProjectDbToForm(
  project: ProjectDbRow
): ProjectFormState {
  return {
    ...project,
    project_moa_id: project.project_moa_id?.toString() ?? null,
    project_ouvrage_id: project.project_ouvrage_id?.toString() ?? null,
    project_motif_id: project.project_motif_id?.toString() ?? null,
    project_budget_id: project.project_budget_id?.toString() ?? null,
  };
}
