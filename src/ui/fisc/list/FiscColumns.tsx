

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import type { FiscView } from "@/domain/fisc/fisc-types";
import { getFiscTypeById } from "@/domain/fisc/fisc-types.catalog";
import { eur } from "@/ui/dashboard/format";

export function getFiscColumns(options: {
  onEdit: (row: FiscView) => void;
  onDelete: (row: FiscView) => void;
  deletingId?: string | null; // ✅ optionnel
}): ColumnDef<FiscView>[] {
  return [
    { accessorKey: "id", header: "Id" },
    { accessorKey: "date", header: "Date", cell: ({ row }) => row.original.date ?? "—" },
    {
      accessorKey: "typeId",
      header: "Type",
      cell: ({ row }) => getFiscTypeById(row.original.typeId)?.libelle ?? String(row.original.typeId),
    },
    { accessorKey: "exerciceCode", header: "Exercice", cell: ({ row }) => row.original.exerciceCode ?? "—" },
    { accessorKey: "montant", header: "Montant", cell: ({ row }) => `${eur(row.original.montant)} €` },
    { accessorKey: "commentaires", header: "Commentaires", cell: ({ row }) => row.original.commentaires ?? "" },

    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const fisc = row.original;
        const isDeleting = options.deletingId === fisc.id;

        return (
          <div className="flex items-center gap-2 justify-center">
            <button
              onClick={() => options.onEdit(fisc)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
              title="Modifier"
              disabled={isDeleting}
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              onClick={() => options.onDelete(fisc)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
              title="Supprimer"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];
}