import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { ConfigUI } from "@/domain/config"
import { CONFIG_TYPE_CATALOG } from "@/domain/config/config.catalog";
import { ColumnSelectorItem } from "@/components/table/ColumnSelector";


/* ------------------------------------------------------------------
   Colonnes
   ------------------------------------------------------------------ */

export const configColumns: ColumnDef<ConfigUI>[] = [
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
    accessorKey: "typeLabel",
    header: "Type",
    cell: ({ row }) => {
      const typeId = row.original.typeId;

      const type = CONFIG_TYPE_CATALOG.find(
        (t) => t.id === typeId
      );

      return type ? type.label : "";
    }
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      const id = row.original.id;

      async function onDelete() {
        if (!confirm("Supprimer cette configuration ?")) {
          return;
        }

        const res = await fetch(`/api/configs/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          alert("Erreur lors de la suppression");
          return;
        }

        window.location.reload();
      }

      return (
        <div className="flex items-center gap-2 justify-center">
          <a
            href={`/configs/edit/${id}`}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
            title="Modifier"
          >
            <Pencil className="h-4 w-4" />
          </a>

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
  },
];

/* ------------------------------------------------------------------ */
/* Colonnes sélectionnables */
/* ------------------------------------------------------------------ */

export const selectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "ID", visible: true },
  { key: "nom", label: "Nom", visible: true },
  { key: "typeLabel", label: "Type", visible: true },
  // "actions" toujours visible 
];
