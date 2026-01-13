

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Calendar } from "lucide-react";
import { Trash2 } from "lucide-react";
import type { LotTravView } from "@/domain/lottrav/lottrav-view.interface";
import { formatDateFR } from "@/helpers/date";
import { getLotStatusLabel, LotTravStatusId } from "@/domain/lottrav/lottrav.catalog";

export function getLotTravColumns(
  options: {
    onEdit: (lot: LotTravView) => void;
    onPlanning: (lot: LotTravView) => void;
    onDelete: (lot: LotTravView) => void;
  }
): ColumnDef<LotTravView>[] {

  return [
    {
      accessorKey: "lottravId",
      header: "Id",
    },
    {
      id: "nom",
      accessorKey: "nom",
      header: "Nom du lot",
      cell: ({ getValue }) => (
        <span className="font-medium">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: "statusId",
      header: "Statut",
      cell: ({ getValue }) =>
        getLotStatusLabel(getValue<LotTravStatusId>()),
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
      accessorKey: "responsableEmail",
      header: "Responsable",
      cell: ({ getValue }) => {
        const email = getValue<string | undefined>();
        return email ?? "—";
      },
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
              onClick={() => options.onPlanning(lot)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
              title="Planning"
            >
              <Calendar className="h-4 w-4" />
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
