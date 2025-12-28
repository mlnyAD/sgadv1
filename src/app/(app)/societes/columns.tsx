import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { SocieteUI } from "@/domain/societe";
import { ColumnSelectorItem } from "@/components/table/ColumnSelector";

/* ------------------------------------------------------------------
   Colonnes
   ------------------------------------------------------------------ */

export const societeColumns: ColumnDef<SocieteUI>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ getValue }) => (
      <span className="font-medium">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "adresse1",
    header: "Adresse 1",
  },
  {
    accessorKey: "adresse2",
    header: "Adresse 2",
  },
  {
    accessorKey: "adresse3",
    header: "Adresse 3",
  },
  {
    accessorKey: "ville",
    header: "Ville",
  },
  {
    accessorKey: "codePostal",
    header: "Code postal",
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
      if (!confirm("Supprimer cette société ?")) {
        return;
      }

      const res = await fetch(`/api/societes/${id}`, {
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
          href={`/societes/edit/${id}`}
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


/* ------------------------------------------------------------------ */
/* Colonnes sélectionnables */
/* ------------------------------------------------------------------ */
export const societeSelectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "ID", visible: false },
  { key: "nom", label: "Nom", visible: true },
  { key: "adresse1", label: "Adresse 1", visible: true },
  { key: "adresse2", label: "Adresse 2", visible: true },
  { key: "adresse3", label: "Adresse 3", visible: true },
  { key: "ville", label: "Ville", visible: true },
  { key: "codePostal", label: "Code postal", visible: true },
  // "actions" toujours visible];
];
