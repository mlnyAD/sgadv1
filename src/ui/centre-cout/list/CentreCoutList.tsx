

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import type { CentreCoutView } from "@/domain/centre-cout/centre-cout-types";
import { getCentreCoutColumns } from "@/ui/centre-cout/list/CentreCoutColumns";
import { CentreCoutSelectableColumns } from "@/ui/centre-cout/list/CentreCoutSelectableColumns";
import { CentreCoutFilters } from "@/ui/centre-cout/list/CentreCoutFilters";
import {
  toCentreCoutFamilleId,
  type CentreCoutFamilleId,
} from "@/domain/centre-cout/centre-cout-familles.catalog";

interface CentreCoutListProps {
  centreCouts: CentreCoutView[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export function CentreCoutList({
  centreCouts,
  page,
  pageSize,
  totalPages,
}: CentreCoutListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const actifParam = searchParams.get("actif");
  const search = searchParams.get("search") ?? "";
  const code = searchParams.get("code") ?? "";

  const familleIdParam = searchParams.get("familleId");
  const familleId: CentreCoutFamilleId | null =
    familleIdParam && familleIdParam !== ""
      ? toCentreCoutFamilleId(Number(familleIdParam))
      : null;

  const actifFilter =
    actifParam === null
      ? null
      : actifParam === "true";

  const [visibleColumns] = useState(CentreCoutSelectableColumns);

  const handleEdit = (centreCout: CentreCoutView) => {
    router.push(`/centres-cout/${centreCout.id}`);
  };

  const columns = getCentreCoutColumns({
    onEdit: handleEdit,
  });

  function pushWithParams(mutator: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    router.push(`?${params.toString()}`);
  }

  return (
	<div className="p-4 space-y-4">
		<GenericListTable
			data={centreCouts}
			columns={columns}
			selectableColumns={visibleColumns}
			page={page}
			pageSize={pageSize}
			totalPages={totalPages}
			onPageChange={(nextPage) => {
				pushWithParams((params) => {
				params.set("page", String(nextPage));
				params.set("pageSize", String(pageSize));
				});
			}}
			onPageSizeChange={(nextPageSize) => {
				pushWithParams((params) => {
				params.set("page", "1");
				params.set("pageSize", String(nextPageSize));
				});
			}}
			filtersSlot={
				<CentreCoutFilters
				search={search}
				code={code}
				familleId={familleId}
				actif={actifFilter}
				onChange={(next) => {
					pushWithParams((params) => {
					if (next.search.trim()) params.set("search", next.search.trim());
					else params.delete("search");

					if (next.code.trim()) params.set("code", next.code.trim());
					else params.delete("code");

					if (next.familleId != null) {
						params.set("familleId", String(next.familleId));
					} else {
						params.delete("familleId");
					}

					if (next.actif === null) {
						params.delete("actif");
					} else {
						params.set("actif", String(next.actif));
					}

					params.set("page", "1");
					});
				}}
				/>
			}
		/>
	</div>
  );
}