

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import { getInvoiceColumns } from "@/ui/invoice/list/InvoiceColumns";
import { InvoiceSelectableColumns } from "@/ui/invoice/list/InvoiceSelectableColumns";
import { InvoiceFilters } from "@/ui/invoice/list/InvoiceFilters";
import type { InvoiceListItem } from "@/ui/invoice/invoice.types";

import { deleteInvoiceSalesAction } from "@/features/invoice/invoice-actions";

interface InvoiceListProps {
  items: InvoiceListItem[];
  page: number;
  pageSize: number;
  totalPages: number;
  onDeleteItem?: (item: InvoiceListItem) => Promise<void>;
  // ex: "/invoices/sales" ou "/invoices/purchase"
  basePath: string;
}

export function InvoiceList({ items, page, pageSize, totalPages, basePath }: InvoiceListProps) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") ?? "";
  const [visibleColumns] = useState(InvoiceSelectableColumns);
  const [deletingId, setDeletingId] = useState<string | null>(null);


  const handleEdit = (item: InvoiceListItem) => {
    router.push(`${basePath}/${item.id}`);
  };

  const onDelete = useCallback(async (item: InvoiceListItem) => {
    const ok = window.confirm(
      `Confirmer la suppression de la vente "${item.reference ?? item.designation ?? item.id}" ?\nCette action est irréversible.`
    );
    if (!ok) return;

    setDeletingId(item.id);
    try {
      await deleteInvoiceSalesAction(item.id);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Suppression impossible");
    } finally {
      setDeletingId(null);
    }
  }, [router]);

   const columns = getInvoiceColumns({
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
        <InvoiceFilters
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