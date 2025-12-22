"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import { configColumns, ConfigListItem } from "./columns";
import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";
import { ConfigsFilters } from "./ConfigFilters";
import { CONFIG_TYPE_CATALOG } from "@/shared/config/config-type";

/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

interface ConfigsTableProps {
  data: ConfigListItem[];
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ------------------------------------------------------------------ */
/* Colonnes sélectionnables */
/* ------------------------------------------------------------------ */

const selectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "ID", visible: false },
  { key: "nom", label: "Nom", visible: true },
  { key: "typeLabel", label: "Type", visible: true },
  // "actions" toujours visible
];

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function ConfigsTable({
  data,
  page,
  pageSize,
  totalPages,
}: ConfigsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();


  const typeOptions = CONFIG_TYPE_CATALOG.map((type) => ({
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
      columns={configColumns}
      selectableColumns={selectableColumns}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      filtersSlot={
        <ConfigsFilters
          initial={filters}
          types={typeOptions}
          onChange={onFiltersChange}
        />
      }
    />
  );
}


