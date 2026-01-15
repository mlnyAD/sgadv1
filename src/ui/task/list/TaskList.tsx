

"use client";

import { useRouter } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import type { TaskView } from "@/domain/task/task-view";
import { getTaskColumns } from "@/ui/task/list/TaskColumns";
import { TaskSelectableColumns } from "@/ui/task/list/TaskSelectableColumns";
import { useState } from "react";
import DeleteTaskDialog from "@/ui/task/delete/DeleteTaskDialog";
import { TaskFiltersClient } from "@/ui/task/list/TaskFiltersClient";
import { TASK_STATUS_OPTIONS } from "@/domain/task/task-status";


interface TaskListProps {
  projectId: number;
  lottravId: number;
  tasks: TaskView[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export function TaskList({ projectId, lottravId, tasks, page, pageSize, totalPages }: TaskListProps) {

  const router = useRouter();

  const [visibleColumns] = useState(TaskSelectableColumns);
  const [deleteTarget, setDeleteTarget] = useState<TaskView | null>(null);

  const handleEdit = (task: TaskView) => {
    router.push(`/projects/${projectId}/lots/${lottravId}/tasks/${task.id}`);
  };
  
  const columns = getTaskColumns({
    onEdit: handleEdit,
    onDelete: (lot) => setDeleteTarget(lot),
  });

  const statuses = TASK_STATUS_OPTIONS;  

  return (
    <>

      <GenericListTable
        data={tasks}
        columns={columns}
        selectableColumns={visibleColumns}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={(nextPage) => {
          router.push(`?page=${nextPage}&pageSize=${pageSize}`);
        }}
        onPageSizeChange={(nextPageSize) => {
          router.push(`?page=1&pageSize=${nextPageSize}`);
        }}
        filtersSlot={
          <TaskFiltersClient statuses={statuses} />
        }
      />

      {deleteTarget && (
        <DeleteTaskDialog
          open={true}
          onOpenChange={() => setDeleteTarget(null)}
          projectId={projectId}
          lottravId={lottravId}
          taskId={deleteTarget.id}
          taskName={deleteTarget.nom}
          onDeleted={() => {
            setDeleteTarget(null);
            router.refresh();
          }}
        />
      )}

    </>

  );
}
