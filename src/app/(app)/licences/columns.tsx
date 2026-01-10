

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { LicenceUI } from "@/domain/licence";
import { LICENCE_STATUS_CATALOG } from "@/domain/licence/licence.catalog";
import { ColumnSelectorItem } from "@/components/table/ColumnSelector";

/* ------------------------------------------------------------------
   Colonnes
   ------------------------------------------------------------------ */

export const licenceColumns: ColumnDef<LicenceUI>[] = [
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
    accessorKey: "statusLabel",
    header: "Etat",
    cell: ({ row }) => {
      const status = row.original.status;

      const item = LICENCE_STATUS_CATALOG.find(
        (s) => s.id === status
      );

      return item ? item.label : "";
    },
  },
  {
    accessorKey: "startDate",
    header: "Début",   
  },
  {
    accessorKey: "endDate",
    header: "Fin",   
  },
  {
    accessorKey: "clientLabel",
    header: "Client",
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      const id = row.original.id;

      async function onDelete() {
        if (!confirm("Supprimer cette licence ?")) {
          return;
        }

        const res = await fetch(`/api/licences/${id}`, {
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
            href={`/licences/edit/${id}`}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
            title="Consulter / Modifier"
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
  { key: "id", label: "ID", visible: false },
  { key: "nom", label: "Nom", visible: true },
  { key: "statusLabel", label: "Statut", visible: true },
  { key: "startDate", label: "Début", visible: true },
  { key: "endDate", label: "Fin", visible: true },
  { key: "clientLabel", label: "Client", visible: true },
  // "actions" toujours visible
];
