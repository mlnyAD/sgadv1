
import { formatDateFR } from "@/helpers/date";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { truncate } from "@/helpers/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


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
  cell: ({ row }) => {
    const titre = row.original.nom;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="block max-w-[420px] truncate whitespace-nowrap">
            {truncate(titre, 70)}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          {titre}
        </TooltipContent>
      </Tooltip>
    );
  },
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
    const important = row.original.important;

    return (
      <span
        className={
          important
            ? "font-semibold text-green-600"
            : "text-gray-500"
        }
      >
        {important ? "Oui" : "Non"}
      </span>
    );
  },
},{
  accessorKey: "urgent",
  header: "Urgent",
  cell: ({ row }) => {
    const important = row.original.urgent;

    return (
      <span
        className={
          important
            ? "font-semibold text-green-600"
            : "text-gray-500"
        }
      >
        {important ? "Oui" : "Non"}
      </span>
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
