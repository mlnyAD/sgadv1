

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import type { SocieteView } from "@/domain/societe/societe-types";

export function getSocieteColumns(options: {
	onEdit: (societe: SocieteView) => void;
}): ColumnDef<SocieteView>[] {
	return [
		{
			accessorKey: "code",
			header: "Code",
		},
		{
			id: "nom",
			header: "Nom",
			cell: ({ row }) => {
				const { nom } = row.original;
				return `${nom ?? ""}`.trim() || "—";
			},
		},
		{
			id: "adresse",
			header: "Adresse",
			cell: ({ row }) => {
				const { adresse } = row.original;
				return `${adresse ?? ""}`.trim() || "—";
			},
		},
		{
			accessorKey: "siren",
			header: "SIREN",
			cell: ({ row }) => {
				const { siren } = row.original;
				return `${siren ?? ""}`.trim() || "—";
			},
		},
    	{
			accessorKey: "client",
			header: "Client",
			cell: ({ row }) =>
				row.original.client ? "Non" : "Oui",
		},
		{
			accessorKey: "fournisseur",
			header: "Fournisseur",
			cell: ({ row }) =>
				row.original.fournisseur ? "Non" : "Oui",
		},
		{
			id: "actions",
			header: "Actions",
			enableSorting: false,
			cell: ({ row }) => (
				<div className="flex justify-center">
					<button
						className="h-8 w-8 rounded-md border hover:bg-muted flex items-center justify-center"
						title="Modifier"
						onClick={() => options.onEdit(row.original)}
					>
						<Pencil className="h-4 w-4" />
					</button>
				</div>
			),
		},
	];
}
