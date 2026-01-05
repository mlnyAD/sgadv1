

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { ProjectListRow } from "@/domain/project/projectList/projectList.types";
import { Button } from "@/components/ui/button";
import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";
import { PROJECT_STATUS_CATALOG } from "@/domain/project/project.catalog";

/* ------------------------------------------------------------------ */
/* Colonnes projets */
/* ------------------------------------------------------------------ */

export const projectColumns: ColumnDef<ProjectListRow>[] = [
	{
		accessorKey: "project_ident",
		header: "Identifiant",
	},
	{
		accessorKey: "project_nom",
		header: "Nom",
		cell: ({ row }) => (
			<Link
				href={`/projects/${row.original.project_id}/resume`}
				className="font-medium underline-offset-4 hover:underline"
			>
				{row.original.project_nom}
			</Link>
		),
	},
	{
		accessorKey: "project_status_id",
		header: "État",
		cell: ({ row }) => {
			const status = PROJECT_STATUS_CATALOG.find(
				(s) => s.id === row.original.project_status_id
			);

			return status ? status.label : "";
		},
	},
	{
		accessorKey: "project_start",
		header: "Début",
	},
	{
		accessorKey: "project_end",
		header: "Fin",
	},
	{
		id: "actions",
		header: "Actions",
		enableSorting: false,
		cell: ({ row }) => (
			<div className="flex justify-end">
				<Button asChild size="sm" variant="outline">
					<Link href={`/projects/${row.original.project_id}/resume`}>
						Voir le résumé
					</Link>
				</Button>
			</div>
		),
	},
];

/* ------------------------------------------------------------------ */
/* Colonnes sélectionnables */
/* ------------------------------------------------------------------ */

export const selectableColumns: ColumnSelectorItem[] = [
	{ key: "project_ident", label: "Identifiant", visible: true },
	{ key: "project_nom", label: "Nom", visible: true },
	{ key: "project_status_label", label: "État", visible: true },
	{ key: "project_start", label: "Début", visible: true },
	{ key: "project_end", label: "Fin", visible: true },
	// actions toujours visibles
];
