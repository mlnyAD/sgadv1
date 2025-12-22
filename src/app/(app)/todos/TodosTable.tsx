"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import { todoColumns } from "./columns";
import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";
import { TodosFilters } from "./TodosFilters";
import { TODO_ETAT_CATALOG } from "@/domain/todo/todo-etat.catalog";

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


  const typeOptions = TODO_ETAT_CATALOG.map((type) => ({
	id: type.id,
	label: type.label,
  }));

  const filters = {
	search: searchParams.get("search") ?? "",
	configTypeId: searchParams.get("configTypeId")
	  ? Number(searchParams.get("configTypeId"))
	  : null,
  };


  function onFiltersChange(next: typeof filters) {
	const params = new URLSearchParams(searchParams.toString());

	// search
	if (next.search) params.set("search", next.search);
	else params.delete("search");

	// configTypeId
	if (next.configTypeId !== null)
	  params.set("configTypeId", String(next.configTypeId));
	else params.delete("configTypeId");

	params.set("page", "1");
	router.push(`/configs?${params.toString()}`);
  }

  /* ------------------------------------------------------------------
	 Pagination handlers
	 ------------------------------------------------------------------ */

  function onPageChange(newPage: number) {
	const params = new URLSearchParams(searchParams.toString());
	params.set("page", String(newPage));
	params.set("pageSize", String(pageSize));
	router.push(`/configs?${params.toString()}`);
  }

  function onPageSizeChange(size: number) {
	const params = new URLSearchParams(searchParams.toString());
	params.set("page", "1");
	params.set("pageSize", String(size));
	router.push(`/configs?${params.toString()}`);
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
		  initial={filters}
		  types={typeOptions}
		  onChange={onFiltersChange}
		/>
	  }
	/>
  );
}


