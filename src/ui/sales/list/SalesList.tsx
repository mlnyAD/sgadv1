

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import { getSalesColumns } from "@/ui/sales/list/SalesColumns";
import { SalesSelectableColumns } from "@/ui/sales/list/SalesSelectableColumns";
import { SalesFilters } from "@/ui/sales/list/SalesFilters";
import type { SalesListItem } from "@/ui/sales/sales.types";

import { deleteSalesAction } from "@/features/sales/sales-actions";

type FilterOption = {
  value: string;
  label: string;
};

interface SalesListProps {
  items: SalesListItem[];
  page: number;
  pageSize: number;
  totalPages: number;
  onDeleteItem?: (item: SalesListItem) => Promise<void>;
  basePath: string;
  filterOptions: {
    societes: FilterOption[];
    exercices: FilterOption[];
    revenueTypes: FilterOption[];
  };
}

export function SalesList({
  items,
  page,
  pageSize,
  totalPages,
  basePath,
  filterOptions,
}: SalesListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search") ?? "";
  const socId = searchParams.get("socId") ?? "";
  const exerId = searchParams.get("exerId") ?? "";
  const revenueTypeId = searchParams.get("revenueTypeId") ?? "";
  const paidStatus = searchParams.get("paidStatus") ?? "";

  const [visibleColumns] = useState(SalesSelectableColumns);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (item: SalesListItem) => {
    router.push(`${basePath}/${item.id}`);
  };

  const onDelete = useCallback(
    async (item: SalesListItem) => {
      const ok = window.confirm(
        `Confirmer la suppression de la vente "${item.reference ?? item.designation ?? item.id}" ?\nCette action est irréversible.`
      );
      if (!ok) return;

      setDeletingId(item.id);
      try {
        await deleteSalesAction(item.id);
        router.refresh();
      } catch (e) {
        alert(e instanceof Error ? e.message : "Suppression impossible");
      } finally {
        setDeletingId(null);
      }
    },
    [router]
  );

  const columns = getSalesColumns({
    onEdit: handleEdit,
    onDelete,
    isDeleting: (id) => deletingId === id,
  });

  return (
    <GenericListTable
      data={items}
      columns={columns}
      selectableColumns={visibleColumns}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={(nextPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(nextPage));
        params.set("pageSize", String(pageSize));
        router.push(`?${params.toString()}`);
      }}
      onPageSizeChange={(nextPageSize) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        params.set("pageSize", String(nextPageSize));
        router.push(`?${params.toString()}`);
      }}
      filtersSlot={
        <SalesFilters
          initial={{
            search: searchValue,
            socId,
            exerId,
            revenueTypeId,
            paidStatus,
          }}
          options={filterOptions}
          onChange={(next) => {
            const params = new URLSearchParams(searchParams.toString());

            if (!next.search) params.delete("search");
            else params.set("search", next.search);

            if (!next.socId) params.delete("socId");
            else params.set("socId", next.socId);

            if (!next.exerId) params.delete("exerId");
            else params.set("exerId", next.exerId);

            if (!next.revenueTypeId) params.delete("revenueTypeId");
            else params.set("revenueTypeId", next.revenueTypeId);

            if (!next.paidStatus) params.delete("paidStatus");
            else params.set("paidStatus", next.paidStatus);

            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
          onReset={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("search");
            params.delete("socId");
            params.delete("exerId");
            params.delete("revenueTypeId");
            params.delete("paidStatus");
            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
        />
      }
    />
  );
}