

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import { getPurchaseColumns } from "@/ui/purchase/list/PurchaseColumns";
import { PurchaseSelectableColumns } from "@/ui/purchase/list/PurchaseSelectableColumns";
import { PurchaseFilters } from "@/ui/purchase/list/PurchaseFilters";
import type { PurchaseListItem } from "@/ui/purchase/purchase.types";

import { deletePurchaseAction } from "@/features/purchase/purchase-actions";

interface PurchaseListProps {
  items: PurchaseListItem[];
  page: number;
  pageSize: number;
  totalPages: number;
  onDeleteItem?: (item: PurchaseListItem) => Promise<void>;
  basePath: string;
}

export function PurchaseList({ items, page, pageSize, totalPages, basePath }: PurchaseListProps) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") ?? "";
  const [visibleColumns] = useState(PurchaseSelectableColumns);
  const [deletingId, setDeletingId] = useState<string | null>(null);


  const handleEdit = (item: PurchaseListItem) => {
    router.push(`${basePath}/${item.id}`);
  };

  const onDelete = useCallback(async (item: PurchaseListItem) => {
    const ok = window.confirm(
      `Confirmer la suppression de la vente "${item.reference ?? item.designation ?? item.id}" ?\nCette action est irréversible.`
    );
    if (!ok) return;

    setDeletingId(item.id);
    try {
      await deletePurchaseAction(item.id);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Suppression impossible");
    } finally {
      setDeletingId(null);
    }
  }, [router]);

   const columns = getPurchaseColumns({
    onEdit: handleEdit ,
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
        <PurchaseFilters
          initial={{ search: searchValue }}
          onChange={(next) => {
            const params = new URLSearchParams(searchParams.toString());

            if (!next.search) params.delete("search");
            else params.set("search", next.search);

            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
        />
      }
    />
  );
}