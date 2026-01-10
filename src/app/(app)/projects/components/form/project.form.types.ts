


import type { ProjectDbRow } from "@/domain/project/project.db";

export type ProjectFormState =
  Omit<
    ProjectDbRow,
  | "project_ouvrage_id"
  | "project_motif_id"
  | "project_budget_id"
  | "project_moa_id"
    > & {
    project_ouvrage_id: string | null;
    project_motif_id: string | null;
    project_budget_id: string | null;
    project_moa_id: string | null;
  };