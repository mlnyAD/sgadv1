

'use server'

import {
  createProject,
  updateProject,
} from '@/domain/project/project.repository'

import {
  mapProjectUIToDbRow,
} from '@/domain/project/project.mapper'

import type { ProjectUI } from '@/domain/project/project.ui'

export async function createProjectAction(
  ui: ProjectUI
) {
  const dbRow = mapProjectUIToDbRow(ui)
  await createProject(dbRow)
}

export async function updateProjectAction(
  projectId: number,
  ui: ProjectUI
) {
  const dbRow = mapProjectUIToDbRow(ui)
  await updateProject(projectId, dbRow)
}
