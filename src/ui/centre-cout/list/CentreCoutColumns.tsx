

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import type { CentreCoutView } from "@/domain/centre-cout/centre-cout-types";

export function getCentreCoutColumns(
	options: {
		onEdit: (centreCout: CentreCoutView) => void;
	}
): ColumnDef<CentreCoutView>[] {

	return [
		{
			accessorKey: "id",
			header: "Id",
		},
		{
			accessorKey: "code",
			header: "Code",
			cell: ({ row }) => {
				const code = row.original.code;
				return code;
			},
		},
		{
			accessorKey: "libelle",
			header: "Libellé",
			cell: ({ row }) => {
				const libelle = row.original.libelle;
				return libelle;
			},
		},
		{
			accessorKey: "actif",
			header: "Actif",
			cell: ({ row }) => {
				const actif = row.original.actif;
				return actif ? "Actif" : "Inactif";
			},
		},
		{
			accessorKey: "clientNom",
			header: "Client",
		},
		{
			accessorKey: "familleLibelle",
			header: "Famille",
		},
		{
			id: "actions",
			header: "Actions",
			enableSorting: false,
			cell: ({ row }) => {
				const centreCout = row.original;

				return (
					<div className="flex items-center gap-2 justify-center">
						<button
							onClick={() => options.onEdit(centreCout)}
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
