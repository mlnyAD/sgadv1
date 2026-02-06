

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import type { SocieteView } from "@/domain/societe/societe-types";
import { getSocieteColumns } from "./SocieteColumns";
import { SocieteFilters } from "./SocieteFilters";

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

  const actifParam = searchParams.get("actif");
  const actif =
    actifParam === null ? null : actifParam === "true";

  const columns = getSocieteColumns({
    onEdit: (op) => router.push(`/societes/${op.id}`),
  });

  return (
    <GenericListTable
      data={societes}
      columns={columns}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={(nextPage) => {
        router.push(
          `?page=${nextPage}&pageSize=${pageSize}${
            actifParam ? `&actif=${actifParam}` : ""
          }`
        );
      }}
      onPageSizeChange={(nextPageSize) => {
        router.push(
          `?page=1&pageSize=${nextPageSize}${
            actifParam ? `&actif=${actifParam}` : ""
          }`
        );
      }}
      filtersSlot={
        <SocieteFilters
          actif={actif}
          onChange={(next) => {
            const params = new URLSearchParams(
              searchParams.toString()
            );

            if (next === null) {
              params.delete("actif");
            } else {
              params.set("actif", String(next));
            }

            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
        />
      }
    />
  );
}
