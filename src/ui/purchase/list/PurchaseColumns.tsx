

import type { ColumnDef } from "@tanstack/react-table";
import { Trash2, Pencil, MessageSquare } from "lucide-react";
import type { PurchaseListItem } from "@/ui/purchase/purchase.types";

const rightAlignedMoney = (value: number) => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  return (
    <div className={`text-right ${isNegative ? "text-red-600" : ""}`}>
      {isNegative ? "-" : ""}
      {absValue.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </div>
  );
};

export function getPurchaseColumns(options: {
  onEdit: (item: PurchaseListItem) => void;
  onDelete: (item: PurchaseListItem) => void;
  isDeleting?: (id: string) => boolean;
}): ColumnDef<PurchaseListItem>[] {
  return [
    { accessorKey: "id", header: "Id" },

    {
      accessorKey: "dateFacture",
      header: "Date",
    },
    {
      accessorKey: "dateValeur",
      header: "Date banque",
    },
    {
      accessorKey: "exerciceCode",
      header: () => <div className="text-center">Exercice</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.original.exerciceCode}</div>
      ),
    },
    {
      accessorKey: "centreCoutCode",
      header: () => <div className="text-center">Centre coût</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.original.centreCoutCode}</div>
      ),
    },
    {
      accessorKey: "societeNom",
      header: "Fournisseur",
      cell: ({ row }) => row.original.societeNom ?? "",
    },
    {
      accessorKey: "designation",
      header: "Désignation",
      cell: ({ row }) => row.original.designation ?? "",
    },
    {
      accessorKey: "reference",
      header: "Référence",
      cell: ({ row }) => row.original.reference ?? "",
    },
    {
      accessorKey: "montantHt",
      header: () => <div className="text-right">HT</div>,
      cell: ({ row }) => rightAlignedMoney(row.original.montantHt ?? 0),
    },
    {
      accessorKey: "montantTax",
      header: () => <div className="text-right">TVA</div>,
      cell: ({ row }) => rightAlignedMoney(row.original.montantTax ?? 0),
    },
    {
      accessorKey: "montantTtc",
      header: () => <div className="text-right">TTC</div>,
      cell: ({ row }) => rightAlignedMoney(row.original.montantTtc ?? 0),
    },
    {
      accessorKey: "paidByCltAmount",
      header: () => <div className="text-right">Payé société</div>,
      cell: ({ row }) => rightAlignedMoney(row.original.paidByCltAmount ?? 0),
    },
    {
      accessorKey: "paidByThirdPartyAmount",
      header: () => <div className="text-right">Payé tiers</div>,
      cell: ({ row }) => rightAlignedMoney(row.original.paidByThirdPartyAmount ?? 0),
    },
    {
      id: "obs",
      header: () => <div className="text-center">Obs.</div>,
      cell: ({ row }) => {
        const hasComments = Boolean(row.original.comments?.trim());

        return (
          <div className="flex justify-center">
            {hasComments ? (
              <span title={row.original.comments ?? ""}>
                <MessageSquare className="h-4 w-4 text-amber-600" />
              </span>
            ) : null}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const item = row.original;
        const deleting = options.isDeleting?.(item.id) ?? false;

        return (
          <div className="flex items-center gap-2 justify-center">
            <button
              onClick={() => options.onEdit(item)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
              title="Modifier"
              type="button"
              aria-label="Modifier"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              onClick={() => options.onDelete(item)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted disabled:opacity-50"
              title="Supprimer"
              type="button"
              aria-label="Supprimer"
              disabled={deleting}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];
}