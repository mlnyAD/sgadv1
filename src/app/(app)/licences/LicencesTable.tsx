

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import { licenceColumns, selectableColumns } from "./columns";
import { LicencesFilters } from "./LicencesFilters";
import { LICENCE_STATUS_CATALOG } from "@/domain/licence/licence.catalog";
import type { LicenceUI } from "@/domain/licence";

/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

interface LicencesTableProps {
  data: LicenceUI[];
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function LicencesTable({
  data,
  page,
  pageSize,
  totalPages,
}: LicencesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusOptions = LICENCE_STATUS_CATALOG.map((status) => ({
    id: status.id,
    label: status.label,
  }));

  const filters = {
    search: searchParams.get("search") ?? "",
    status: searchParams.get("status"),
  };

  function onFiltersChange(next: typeof filters) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.search) params.set("search", next.search);
    else params.delete("search");

    if (next.status) params.set("status", next.status);
    else params.delete("status");

    params.set("page", "1");
    router.push(`/licences?${params.toString()}`);
  }

  function onPageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("pageSize", String(pageSize));
    router.push(`/licences?${params.toString()}`);
  }

  function onPageSizeChange(size: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("pageSize", String(size));
    router.push(`/licences?${params.toString()}`);
  }

  return (
    <GenericListTable
      data={data}
      columns={licenceColumns}
      selectableColumns={selectableColumns}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      filtersSlot={
        <LicencesFilters
          initial={filters}
          statuses={statusOptions}
          onChange={onFiltersChange}
        />
      }
    />
  );
}
