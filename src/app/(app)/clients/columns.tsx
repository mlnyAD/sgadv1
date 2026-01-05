

// clients/columns.ts

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Ban } from "lucide-react";
import { ClientUI } from "@/domain/client";
import { CLIENT_STATUS_CATALOG } from "@/domain/client/client.catalog";
import { ColumnSelectorItem } from "@/components/table/ColumnSelector";

/* ------------------------------------------------------------------
   Colonnes
   ------------------------------------------------------------------ */

export const clientColumns: ColumnDef<ClientUI>[] = [
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
    accessorKey: "status",
    header: "État",
    cell: ({ row }) => {
      const statusId = row.original.status;

      const status = CLIENT_STATUS_CATALOG.find(
        (s) => s.id === statusId
      );

      return status ? status.label : "";
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      const id = row.original.id;

      async function onSuspend() {
        if (!confirm("Désactiver ce client ?")) {
          return;
        }

        const res = await fetch(`/api/clients/${id}/suspend`, {
          method: "POST",
        });

        if (!res.ok) {
          alert("Erreur lors de la désactivation");
          return;
        }

        window.location.reload();
      }

      return (
        <div className="flex items-center gap-2 justify-center">
          <a
            href={`/clients/edit/${id}`}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
            title="Modifier"
          >
            <Pencil className="h-4 w-4" />
          </a>

          <button
            onClick={onSuspend}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border text-destructive hover:bg-destructive/10"
            title="Désactiver"
          >
            <Ban className="h-4 w-4" />
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
  { key: "status", label: "État", visible: true },
  // "actions" toujours visible
];
