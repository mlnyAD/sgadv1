

"use server";

import { createProject, updateProject } from "@/domain/project/project.repository";
import type { ProjectDbRow } from "@/domain/project/project.db";

export async function createProjectAction(project: ProjectDbRow) {
  await createProject(project);
}

export async function updateProjectAction(
  projectId: number,
  project: ProjectDbRow
) {
  await updateProject(projectId, project);
}
