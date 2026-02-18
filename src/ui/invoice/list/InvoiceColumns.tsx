

import type { ColumnDef } from "@tanstack/react-table";
import { Trash2, Pencil } from "lucide-react";
import type { InvoiceListItem } from "@/ui/invoice/invoice.types";

export function getInvoiceColumns(options: {
	onEdit: (item: InvoiceListItem) => void;
	onDelete: (item: InvoiceListItem) => void;
	isDeleting?: (id: string) => boolean; // optionnel
}): ColumnDef<InvoiceListItem>[] {

	return [
		{ accessorKey: "id", header: "Id" },

		{
			accessorKey: "dateFacture",
			header: "Date",
		},
		{
			accessorKey: "exerciceCode",
			header: "Exercice",
		},
		{
			accessorKey: "societeNom",
			header: "Tiers",
			cell: ({ row }) => row.original.societeNom ?? "",
		},
		{
			accessorKey: "designation",
			header: "Désignation",
			cell: ({ row }) => row.original.designation ?? "",
		},
		{
			accessorKey: "montantTtc",
			header: "TTC",
			cell: ({ row }) => {
				const v = row.original.montantTtc ?? 0;
				return v.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
			},
		},
		{
			accessorKey: "datePaiement",
			header: "Payée",
			cell: ({ row }) => (row.original.datePaiement ? "Oui" : "Non"),
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