

"use client";

import { useRouter } from "next/navigation";
import type { Row } from "@tanstack/react-table";
import type { TaskView } from "@/domain/task/task-view";

export function TaskEditAction({
  projectId,
  lottravId,
  row,
}: {
  projectId: number;
  lottravId: number;
  row: Row<TaskView>;
}) {
  const router = useRouter();
  const task = row.original;

  return (
	<button
	  type="button"
	  className="text-blue-600 underline"
	  onClick={() => router.push(`/projects/${projectId}/lots/${lottravId}/task/${task.id}`)}
	>
	  Éditer
	</button>
  );
}
