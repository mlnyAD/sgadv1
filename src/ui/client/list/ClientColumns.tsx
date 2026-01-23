

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, } from "lucide-react";
import type { ClientView } from "@/domain/client/client-types";

export function getClientColumns(
	options: {
		onEdit: (client: ClientView) => void;
		onDelete: (client: ClientView) => void;
	}
): ColumnDef<ClientView>[] {

	return [
		{
			accessorKey: "id",
			header: "Id",
		},
		{
			accessorKey: "nom",
			header: "Nom du client",
			cell: ({ row }) => {
				const nom = row.original.nom;
				return (nom);
			}
		},
		{
			accessorKey: "code",
			header: "Code",
		},
		{
			accessorKey: "adresse",
			header: "Adresse",
		},
		{
			accessorKey: "ville",
			header: "Ville",
		},
		{
			accessorKey: "pays",
			header: "Pays",
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ getValue }) => {
				const email = getValue<string | undefined>();
				return email ?? "—";
			},
		},
		{
			accessorKey: "actif",
			header: "Actif",
			cell: ({ row }) => {
				const actif = row.original.actif;
				return (actif ? "Actif" : "Inactif");
			}
		},

		{
			id: "actions",
			header: "Actions",
			enableSorting: false,
			cell: ({ row }) => {
				const client = row.original;

				return (
					<div className="flex items-center gap-2 justify-center">
						<button
							onClick={() => options.onEdit(client)}
							className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
							title="Modifier"
						>
							<Pencil className="h-4 w-4" />
						</button>

						<button
							onClick={() => options.onDelete(client)}
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
