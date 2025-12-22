import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDateFR } from "@/helpers/date";
import { ColumnDef } from "@tanstack/react-table";
import { Circle, CircleCheckBig, Pencil, Trash2 } from "lucide-react";


/* ------------------------------------------------------------------
   Type ligne de liste (équivalent OperatorListItem)
   ------------------------------------------------------------------ */

export interface TodoListItem {
  important: boolean;
  urgent: boolean;
  id: number;
  nom: string;
  etat: string;
}

/* ------------------------------------------------------------------
   Colonnes
   ------------------------------------------------------------------ */

export const todoColumns: ColumnDef<TodoListItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "titre",
    header: "Titre",
    cell: ({ getValue }) => (
      <span className="font-medium">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "creation",
    header: "Création",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return formatDateFR(date);
    },
  },
  {
    accessorKey: "cloture",
    header: "Fin le",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return formatDateFR(date);
    },
  },
  {
    accessorKey: "important",
    header: "Important",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex justify-center">
                {todo.important ? (
                  <CircleCheckBig className="ml-2 h-5 w-5 fill-green-500" />
                ) : (
                  <Circle className="ml-2 h-5 w-5 fill-gray-500" />
                )}
              </span>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      );
    },

  },
  {
    accessorKey: "urgent",
    header: "Urgent",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex justify-center">
                {todo.urgent ? (
                  <CircleCheckBig className="ml-2 h-5 w-5 fill-green-500" />
                ) : (
                  <Circle className="ml-2 h-5 w-5 fill-gray-500" />
                )}
              </span>
            </TooltipTrigger>

          </Tooltip>
        </TooltipProvider>
      );
    },

  },
  {
    accessorKey: "etat",
    header: "Etat",
  },

  /* ------------------------------------------------------------------
     Actions
     ------------------------------------------------------------------ */
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      const id = row.original.id;

      async function onDelete() {
        if (!confirm("Supprimer cette action ?")) {
          return;
        }

        const res = await fetch(`/api/todos/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          alert("Erreur lors de la suppression");
          return;
        }

        // reload simple
        window.location.reload();
      }

      return (
        <div className="flex items-center gap-2 justify-center">
          {/* Edit */}
          <a
            href={`/todos/edit/${id}`}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
            title="Modifier"
          >
            <Pencil className="h-4 w-4" />
          </a>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border text-destructive hover:bg-destructive/10"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      );
    },
  }

];
