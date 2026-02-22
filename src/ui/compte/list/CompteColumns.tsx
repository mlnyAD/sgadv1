

import type { ColumnDef } from "@tanstack/react-table";
import type { CompteView } from "@/domain/compte/compte-types";
import { Pencil } from "lucide-react";

export function getCompteColumns(options: { onEdit: (compte: CompteView) => void }): ColumnDef<CompteView>[] {
  return [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "nom",
      header: "Nom compte",
      cell: ({ row }) => {
        const nom = row.original.nom;
        return nom;
      },
    },
    {
      accessorKey: "ordre",
      header: "Ordre",
    },
    {
      accessorKey: "inclusGlobal",
      header: "Inclus global",
      cell: ({ row }) => (row.original.inclusGlobal ? "Oui" : "Non"),
    },
    {
      accessorKey: "actif",
      header: "Actif?",
      cell: ({ row }) => (row.original.actif ? "Actif" : "Inactif"),
    },
    {
      accessorKey: "societeId",
      header: "Société",
      cell: ({ row }) => row.original.societeId ?? "",
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const compte = row.original;

        return (
          <div className="flex items-center gap-2 justify-center">
            <button
              onClick={() => options.onEdit(compte)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
              title="Modifier"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];
}