

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import type { ExerciceView } from "@/domain/exercice/exercice-types";
import { getExerciceColumns } from "@/ui/exercice/list/ExerciceColumns";
import { ExerciceSelectableColumns } from "@/ui/exercice/list/ExerciceSelectableColumns";
import { ExerciceFilters } from "@/ui/exercice/list/ExerciceFilters";

interface ExerciceListProps {
  exercices: ExerciceView[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export function ExerciceList({ exercices, page, pageSize, totalPages }: ExerciceListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search") ?? "";

  const actifParam = searchParams.get("actif");
  const actifFilter: boolean | null =
    actifParam === null ? null : actifParam === "true";

  const [visibleColumns] = useState(ExerciceSelectableColumns);

  const handleEdit = (exercice: ExerciceView) => {
    router.push(`/exercices/${exercice.id}`);
  };

  const columns = getExerciceColumns({
    onEdit: handleEdit,
  });

  return (
    <GenericListTable
      data={exercices}
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
        <ExerciceFilters
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