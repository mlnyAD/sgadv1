"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import { todoColumns } from "./columns";
import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";
import { TodosFilters, TodosFiltersValues } from "./TodosFilters";

import type { TodoListItem } from "./columns";


/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

interface TodosTableProps {
	data: TodoListItem[];
	page: number;
	pageSize: number;
	totalPages: number;
}



/* ------------------------------------------------------------------ */
/* Colonnes sélectionnables */
/* ------------------------------------------------------------------ */

const selectableColumns: ColumnSelectorItem[] = [
	{ key: "id", label: "ID", visible: false },
	{ key: "titre", label: "Titre", visible: true },
	{ key: "creation", label: "Crée le", visible: true },
	{ key: "cloture", label: "Pour le", visible: true },
	{ key: "important", label: "Important", visible: true },
	{ key: "urgent", label: "Urgent", visible: true },
	{ key: "etat", label: "Etat", visible: true },
	// "actions" toujours visible
];

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function TodosTable({
	data,
	page,
	pageSize,
	totalPages,
}: TodosTableProps) {
	const router = useRouter();
	const searchParams = useSearchParams();


	const filters: TodosFiltersValues = {
		search: searchParams.get("search") ?? "",

		urgent:
			searchParams.get("urgent") === "true"
				? true
				: undefined,

		important:
			searchParams.get("important") === "true"
				? true
				: undefined,

		etatId: searchParams.get("etatId")
			? Number(searchParams.get("etatId"))
			: undefined,
	};

	function onFiltersChange(next: TodosFiltersValues) {


		const params = new URLSearchParams(searchParams.toString());

		if (next.search) params.set("search", next.search);
		else params.delete("search");

		if (next.urgent !== undefined)
			params.set("urgent", String(next.urgent));
		else params.delete("urgent");

		if (next.important !== undefined)
			params.set("important", String(next.important));
		else params.delete("important");

		if (next.etatId !== undefined)
			params.set("etatId", String(next.etatId));
		else params.delete("etatId");

		// 🔴 TRÈS IMPORTANT
		params.set("page", "1");

		
		console.log("Filtres changés", params);

		router.push(`/todos?${params.toString()}`);
	}


	/* ------------------------------------------------------------------
	   Pagination handlers
	   ------------------------------------------------------------------ */

	function onPageChange(newPage: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(newPage));
		params.set("pageSize", String(pageSize));
		router.push(`/todos?${params.toString()}`);
	}

	function onPageSizeChange(size: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", "1");
		params.set("pageSize", String(size));
		router.push(`/todos?${params.toString()}`);
	}

	/* ------------------------------------------------------------------
	   Render
	   ------------------------------------------------------------------ */

	return (
		<GenericListTable
			data={data}
			columns={todoColumns}
			selectableColumns={selectableColumns}
			page={page}
			pageSize={pageSize}
			totalPages={totalPages}
			onPageChange={onPageChange}
			onPageSizeChange={onPageSizeChange}
			filtersSlot={
				<TodosFilters
					value={filters}
					onChange={onFiltersChange}
				/>
			}
		/>
	);
}


