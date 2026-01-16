import { deleteTask, updateTask } from "@/domain/task/task-repository";
import { NextRequest, NextResponse } from "next/server";


type Context = {
  params: Promise<{
    projectid: string;
    lottravid: string;
    taskid: string;
  }>;
};

/* ------------------------------------------------------------------ */
/* PUT — Modification d’une tâche                                     */
/* ------------------------------------------------------------------ */
export async function PUT(
  request: NextRequest,
  { params }: Context
) {
  const { projectid, lottravid, taskid } = await params;

  const projectId = Number(projectid);
  const lotId = Number(lottravid);
  const taskId = Number(taskid);

  if (
    !Number.isInteger(projectId) ||
    !Number.isInteger(lotId) ||
    !Number.isInteger(taskId)
  ) {
    return NextResponse.json(
      { error: "Invalid parameters" },
      { status: 400 }
    );
  }

  const body = await request.json();

  await updateTask(projectId, lotId, taskId, body);

  return NextResponse.json({ success: true });
}

/* ------------------------------------------------------------------ */
/* DELETE — Suppression d’une tâche                                   */
/* ------------------------------------------------------------------ */
export async function DELETE(
  _request: NextRequest,
  { params }: Context
) {
  const { projectid, lottravid, taskid } = await params;

  const projectId = Number(projectid);
  const lotId = Number(lottravid);
  const taskId = Number(taskid);

  if (
    !Number.isInteger(projectId) ||
    !Number.isInteger(lotId) ||
    !Number.isInteger(taskId)
  ) {
    return NextResponse.json(
      { error: "Invalid parameters" },
      { status: 400 }
    );
  }

  await deleteTask(projectId, lotId, taskId);

  return NextResponse.json({ success: true });
}
