

import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import type { OperClientView } from "@/domain/operclient/operclient-types";

export function getOperClientColumns(options: {
  onDelete: (association: OperClientView) => void;
}): ColumnDef<OperClientView>[] {
  return [
    /* -------------------- Opérateur -------------------- */

    {
      accessorKey: "operateurEmail",
      header: "Email opérateur",
    },
    {
      accessorKey: "operateurNom",
      header: "Opérateur",
      cell: ({ row }) =>
        row.original.operateurNom?.trim() || "—",
    },
    {
      accessorKey: "operateurActif",
      header: "Statut opérateur",
      cell: ({ row }) =>
        row.original.operateurActif ? "Actif" : "Inactif",
    },

    /* -------------------- Client -------------------- */

    {
      accessorKey: "clientNom",
      header: "Client",
      cell: ({ row }) =>
        row.original.clientNom?.trim() || "—",
    },
    {
      accessorKey: "clientActif",
      header: "Statut client",
      cell: ({ row }) =>
        row.original.clientActif ? "Actif" : "Inactif",
    },

    /* -------------------- Actions -------------------- */

    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            className="h-8 w-8 rounded-md border hover:bg-muted flex items-center justify-center text-destructive"
            title="Supprimer l’association"
            onClick={() => options.onDelete(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];
}
