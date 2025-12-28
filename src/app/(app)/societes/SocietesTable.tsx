"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import {
  societeColumns,
  societeSelectableColumns,
} from "./columns";
import { SocietesFilters } from "./SocietesFilters";
import { SocieteUI } from "@/domain/societe";


/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

interface SocietesTableProps {
  data: SocieteUI[];
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function SocietesTable({
  data,
  page,
  pageSize,
  totalPages,
}: SocietesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* -------------------- Filters state (URL-driven) -------------------- */

  const filters = {
    search: searchParams.get("search") ?? "",
  };

  function onFiltersChange(next: typeof filters) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.search) params.set("search", next.search);
    else params.delete("search");

    params.set("page", "1");
    router.push(`/societes?${params.toString()}`);
  }

  /* -------------------- Pagination handlers -------------------- */

  function onPageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("pageSize", String(pageSize));
    router.push(`/societes?${params.toString()}`);
  }

  function onPageSizeChange(size: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("pageSize", String(size));
    router.push(`/societes?${params.toString()}`);
  }

  /* -------------------- Render -------------------- */

  return (
    <GenericListTable
      data={data}
      columns={societeColumns}
      selectableColumns={societeSelectableColumns}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      filtersSlot={
        <SocietesFilters
          initial={filters}
          onChange={onFiltersChange}
          types={[]}
        />
      }
    />
  );
}

