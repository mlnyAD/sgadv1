

import { NextResponse } from "next/server";
import { createTask } from "@/domain/task/task-repository";

type Context = {
	params: Promise<{
		projectid: string;
		lottravid: string;
	}>;
};


/* ------------------------------------------------------------------ */
/* POST — Création d’une Tâche                                        */
/* ------------------------------------------------------------------ */
export async function POST(
	request: Request,
	{ params }: Context
) {

	const { projectid } = await params;
	const projectId = Number(projectid);

	const { lottravid } = await params;
	const lottravId = Number(lottravid);

	if (!Number.isInteger(projectId) || (!Number.isInteger(lottravId))) {
		return NextResponse.json(
			{ error: "Invalid project id" },
			{ status: 400 }
		);
	}

	const body = await request.json();

await createTask(projectId, lottravId, {
  task_nom: body.name,
  task_start: body.startDate || null,
  task_end: body.endDate || null,
  task_duree: body.duree,
  task_avancement: body.avancement,
  task_etat_id: body.etatId,
  task_responsable_id: body.responsableId ?? null,
});

	return NextResponse.json({ success: true });
}