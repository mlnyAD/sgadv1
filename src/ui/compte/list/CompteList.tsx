

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import type { CompteView } from "@/domain/compte/compte-types";
import { getCompteColumns } from "@/ui/compte/list/CompteColumns";
import { CompteSelectableColumns } from "@/ui/compte/list/CompteSelectableColumns";
import { CompteFilters } from "@/ui/compte/list/CompteFilters";

interface CompteListProps {
  comptes: CompteView[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export function CompteList({ comptes, page, pageSize, totalPages }: CompteListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search") ?? "";

  const actifParam = searchParams.get("actif");
  const actifFilter: boolean | null = actifParam === null ? null : actifParam === "true";

  const [visibleColumns] = useState(CompteSelectableColumns);

  const handleEdit = (compte: CompteView) => {
    router.push(`/comptes/${compte.id}`);
  };

  const columns = getCompteColumns({
    onEdit: handleEdit,
  });

  return (
    <GenericListTable
      data={comptes}
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
        <CompteFilters
          initial={{ search: searchValue, actif: actifFilter }}
          onChange={(next) => {
            const params = new URLSearchParams(searchParams.toString());

            // search
            if (!next.search) params.delete("search");
            else params.set("search", next.search);

            // actif
            if (next.actif === null) params.delete("actif");
            else params.set("actif", String(next.actif));

            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
        />
      }
    />
  );
}