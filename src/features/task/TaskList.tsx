

"use client";

import Link from "next/link";


import { TaskView } from "@/domain/task/task-view.interface";
import { getTaskStatusLabel } from "@/domain/task/task.catalog";


interface Props {
  lottravId: number;
  tasks: TaskView[];
}

export function TaskList({ lottravId, tasks }: Props) {

  console.log("Dans TaskList ", tasks)
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          Liste des tâches
        </h1>

        <Link
          href={`/projects/${lottravId}/lots/create`}
          className="h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground flex items-center"
        >
          Créer une tâche
        </Link>
      </div>

      {/* Liste */}
      {tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucune tâche pour ce lot de travaux.
        </p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Tâche</th>
              <th className="py-2 text-left">Responsable</th>
              <th className="py-2 text-left">Début</th>
              <th className="py-2 text-left">Fin</th>
              <th className="py-2"></th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.taskId}
                className="border-b hover:bg-muted/40"
              >
                <td className="py-2">
                  {task.taskNom}
                </td>

                <td className="py-2">
                  {task.taskResponsableId ?? "-"}
                </td>

                <td className="py-2">
                  {task.taskStart
                    ? new Date(task.taskStart).toLocaleDateString()
                    : "-"}
                </td>

                <td className="py-2">
                  {task.taskEnd
                    ? new Date(task.taskEnd).toLocaleDateString()
                    : "-"}
                </td>

                <span className="text-sm text-muted-foreground">
                  {getTaskStatusLabel(task.taskEtatId)}
                </span>

                <td className="py-2 text-right">
                  <Link
                    href={`/login`}
                    className="text-primary hover:underline"
                  >
                    Ouvrir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
