

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import { clientColumns, selectableColumns } from "./columns";
import { ClientsFilters } from "./ClientsFilters";
import { CLIENT_STATUS_CATALOG } from "@/domain/client/client.catalog";
import type { ClientUI } from "@/domain/client";

/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

interface ClientsTableProps {
  data: ClientUI[];
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function ClientsTable({
  data,
  page,
  pageSize,
  totalPages,
}: ClientsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusOptions = CLIENT_STATUS_CATALOG.map((status) => ({
    id: status.id,
    label: status.label,
  }));

  const filters = {
    search: searchParams.get("search") ?? "",
    status: searchParams.get("status") ?? null,
  };

  function onFiltersChange(next: typeof filters) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.search) params.set("search", next.search);
    else params.delete("search");

    if (next.status !== null)
      params.set("status", String(next.status));
    else params.delete("status");

    params.set("page", "1");
    router.push(`/clients?${params.toString()}`);
  }

  function onPageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("pageSize", String(pageSize));
    router.push(`/clients?${params.toString()}`);
  }

  function onPageSizeChange(size: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("pageSize", String(size));
    router.push(`/clients?${params.toString()}`);
  }

  return (
    <GenericListTable
      data={data}
      columns={clientColumns}
      selectableColumns={selectableColumns}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      filtersSlot={
        <ClientsFilters
          initial={filters}
          statuses={statusOptions}
          onChange={onFiltersChange}
        />
      }
    />
  );
}
