

import { listProjectContacts } from "@/domain/task/task-repository";
import { TaskEditor } from "@/ui/task/edit/TaskEditor";

type Props = {
  params: Promise<{
    projectid: string;
    lottravid: string;
  }>;
};

export default async function CreateTaskPage({ params }: Props) {
  const { projectid, lottravid } = await params;

  const projectId = Number(projectid);
  const lottravId = Number(lottravid);

  const operators = await listProjectContacts();

  return (
    <TaskEditor
      projectId={projectId}
      lottravId={lottravId}
      initialTask={null}
      operators={operators}
    />
  );
}
