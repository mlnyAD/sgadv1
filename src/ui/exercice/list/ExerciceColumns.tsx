

import type { ColumnDef } from "@tanstack/react-table";
import type { ExerciceView } from "@/domain/exercice/exercice-types";
import { Pencil } from "lucide-react";

export function getExerciceColumns(
	options: {
		onEdit: (exercice: ExerciceView) => void;
	}
): ColumnDef<ExerciceView>[] {

	return [
		{
			accessorKey: "id",
			header: "Id",
		},
		{
			accessorKey: "code",
			header: "Code exercice",
			cell: ({ row }) => {
				const nom = row.original.code;
				return (nom);
			}
		},
		{
			accessorKey: "debut",
			header: "Début",
		},
		{
			accessorKey: "fin",
			header: "Fin",
		},
		{
			accessorKey: "actif",
			header: "Actif?",
			cell: ({ row }) => {
				const actif = row.original.actif;
				return (actif ? "Actif" : "Clos");
			}
		},
		{
			accessorKey: "commentaires",
			header: "Commentaires",
		},

		{
			id: "actions",
			header: "Actions",
			enableSorting: false,
			cell: ({ row }) => {
				const exercice = row.original;

				return (
					<div className="flex items-center gap-2 justify-center">
						<button
							onClick={() => options.onEdit(exercice)}
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
