

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import type { TaskView } from "@/domain/task/task-view";
import { formatDateFR } from "@/helpers/date";
import { getTaskStatusLabel, TaskStatusId } from "@/domain/task/task-status";

export function getTaskColumns(
  options: {
    onEdit: (lot: TaskView) => void;
    onDelete: (lot: TaskView) => void;
  }
): ColumnDef<TaskView>[] {

  return [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      id: "nom",
      accessorKey: "nom",
      header: "Nom de la tâche",
      cell: ({ getValue }) => (
        <span className="font-medium">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: "etatId",
      header: "Statut",
      cell: ({ getValue }) =>
        getTaskStatusLabel(getValue<TaskStatusId>()),
    },
    {
      accessorKey: "start",
      header: "Début",
      cell: ({ getValue }) => {
        const date = getValue<Date | null>();
        return date ? formatDateFR(date) : "—";
      },
    },
    {
      accessorKey: "end",
      header: "Fin",
      cell: ({ getValue }) => {
        const date = getValue<Date | null>();
        return date ? formatDateFR(date) : "—";
      },
    },
    {
  header: "Responsable",
  cell: ({ row }) =>
    row.original.responsableEmail ?? "—",
},
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const lot = row.original;

        return (
          <div className="flex items-center gap-2 justify-center">
            <button
              onClick={() => options.onEdit(lot)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
              title="Modifier"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              onClick={() => options.onDelete(lot)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border text-destructive hover:bg-destructive/10"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];
}
