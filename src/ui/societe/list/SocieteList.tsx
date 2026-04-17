

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import type { SocieteView } from "@/domain/societe/societe-types";
import { getSocieteColumns } from "./SocieteColumns";
import { SocieteFilters, type SocieteRoleFilter } from "./SocieteFilters";
import { SocieteSelectableColumns } from "./SocieteSelectableColumns";

interface Props {
  societes: SocieteView[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export function SocieteList({
  societes,
  page,
  pageSize,
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roleParam = (searchParams.get("role") ?? "") as SocieteRoleFilter;
  const [visibleColumns] = useState(SocieteSelectableColumns);

  const columns = getSocieteColumns({
    onEdit: (societe) => router.push(`/societes/${societe.id}`),
  });

  return (
    <GenericListTable
      data={societes}
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
        <SocieteFilters
          role={roleParam}
          onChange={(next) => {
            const params = new URLSearchParams(searchParams.toString());

            if (!next) {
              params.delete("role");
            } else {
              params.set("role", next);
            }

            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
        />
      }
    />
  );
}