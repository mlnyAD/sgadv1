

import { notFound } from "next/navigation";
import { getTaskById, listProjectContacts } from "@/domain/task/task-repository";
import { TaskEditor } from "@/ui/task/edit/TaskEditor";

type Props = {
  params: Promise<{
    projectid: string;
    lottravid: string;
    taskid: string;
  }>;
};

export default async function EditTaskPage({ params }: Props) {
  
  const { projectid, lottravid, taskid } = await params;

  const projectId = Number(projectid);
  const lottravId = Number(lottravid);
  const taskId = Number(taskid);

  if (
    !Number.isInteger(projectId) ||
    !Number.isInteger(lottravId) ||
    !Number.isInteger(taskId)
  ) {
    notFound();
  }

  const task = await getTaskById(taskId);
  if (!task) {
    notFound();
  }

  const operators = await listProjectContacts();

  return (
    <TaskEditor
      projectId={projectId}
      lottravId={lottravId}
      initialTask={task}
      operators={operators}
    />
  );
}

