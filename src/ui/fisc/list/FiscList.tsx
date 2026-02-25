

// src/ui/fisc/list/FiscList.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import type { FiscView } from "@/domain/fisc/fisc-types";
import { getFiscColumns } from "@/ui/fisc/list/FiscColumns";
import { FiscSelectableColumns } from "@/ui/fisc/list/FiscSelectableColumns";
import { FiscFilters } from "@/ui/fisc/list/FiscFilters";

import { deleteFiscAction } from "@/features/fisc/fisc-actions"; // ✅

interface FiscListProps {
  fisc: FiscView[];
  page: number;
  pageSize: number;
  totalPages: number;
  exercicesOptions?: { id: string; code: string }[];
}

export function FiscList({ fisc, page, pageSize, totalPages, exercicesOptions = [] }: FiscListProps) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("typeId");
  const typeIdFilter: number | null = typeParam === null || typeParam === "" ? null : Number(typeParam);

  const exerParam = searchParams.get("exerId");
  const exerIdFilter: string | null = exerParam === null || exerParam === "" ? null : exerParam;

  const [visibleColumns] = useState(FiscSelectableColumns);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const searchValue = searchParams.get("search") ?? "";

  const handleEdit = (row: FiscView) => {
    router.push(`/fisc/${row.id}`);
  };

  const handleDelete = async (row: FiscView) => {
    const ok = window.confirm("Supprimer ce versement fiscal ?");
    if (!ok) return;

    setDeletingId(row.id);
    try {
      await deleteFiscAction(row.id);
      router.refresh(); // ✅ recharge la liste
    } finally {
      setDeletingId(null);
    }
  };

const columns = getFiscColumns({
  onEdit: handleEdit,
  onDelete: handleDelete,
  deletingId, // ✅ AJOUT
});

  return (
    <GenericListTable
      data={fisc}
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
        <FiscFilters
          exercices={exercicesOptions}
          initial={{ search: searchValue, typeId: typeIdFilter, exerId: exerIdFilter }}
          onChange={(next) => {
            const params = new URLSearchParams(searchParams.toString());

            if (!next.search) params.delete("search");
            else params.set("search", next.search);

            if (next.typeId === null) params.delete("typeId");
            else params.set("typeId", String(next.typeId));

            if (next.exerId === null) params.delete("exerId");
            else params.set("exerId", next.exerId);

            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
        />
      }
    />
  );
}