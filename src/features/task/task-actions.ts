



"use server";

import type { TaskStatusId } from "@/domain/task/task-status";
import {
	createTask,
	deleteTask,
	updateTask,
} from "@/domain/task/task-repository";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type TaskFormData = {
	name: string;
	startDate: string;
	endDate: string;
	duree: number;
	avancement: number;
	etatId: TaskStatusId;
	responsableId: number | null;
};

/**
 * Payload tel qu'attendu par la couche persistence
 * (repository / base de données)
 */
type TaskPersistencePayload = {
	task_nom: string;
	task_start: string | null;
	task_end: string | null;
	task_duree: number;
	task_avancement: number;
	task_etat_id: number;
	task_responsable_id: number | null;
};

/* ------------------------------------------------------------------ */
/* Action                                                              */
/* ------------------------------------------------------------------ */

export async function saveTask(
	projectId: number,
	lottravId: number,
	data: TaskFormData,
	taskId?: number,
): Promise<void> {

	const payload: TaskPersistencePayload = {
		task_nom: data.name,
		task_start: data.startDate || null,
		task_end: data.endDate || null,
		task_duree: data.duree,
		task_avancement: data.avancement,
		task_etat_id: data.etatId,
		task_responsable_id: data.responsableId ?? null,
	};

	if (taskId) {
		// ✏️ UPDATE
		await updateTask(projectId, lottravId, taskId, payload);
	} else {
		// ➕ CREATE
		await createTask(projectId, lottravId, payload);
	}
}

/* ------------------------------------------------------------------ */
/* Delete                                                             */
/* ------------------------------------------------------------------ */

export async function deleteTaskAction(
	projectId: number,
	lottravId: number,
	taskId: number,
): Promise<void> {
	await deleteTask(projectId, lottravId, taskId);
}