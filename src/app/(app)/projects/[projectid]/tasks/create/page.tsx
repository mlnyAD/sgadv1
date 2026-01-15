

import { TaskEditor } from "@/ui/task/edit/TaskEditor";
import { listProjectContacts } from "@/domain/lottrav/lottrav-repository";
import { notFound } from "next/navigation";


type Props = {
  params: Promise<{
	projectId: string;
	lottravId: string;
  }>;
};

export default async function CreateTaskPage({ params }: Props) {

  const { projectId } = await params;
  const { lottravId } = await params;

  const projectIdNum = Number(projectId);
  if (!Number.isInteger(projectIdNum)) {
	notFound();
  }

  const lottravIdNum = Number(lottravId);
  if (!Number.isInteger(lottravIdNum)) {
	notFound();
  }
  const operators = await listProjectContacts();


  return (
	<TaskEditor
	  projectId={projectIdNum}
	  lottravId={lottravIdNum}
	  initialTask={null}
	  operators={operators}
	/>
  );
}
