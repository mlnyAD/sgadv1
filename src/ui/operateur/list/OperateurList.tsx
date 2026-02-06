

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import type { OperateurView } from "@/domain/operateur/operateur-types";
import { getOperateurColumns } from "./OperateurColumns";
import { OperateurFilters } from "./OperateurFilters";

interface Props {
  operateurs: OperateurView[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export function OperateurList({
  operateurs,
  page,
  pageSize,
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const actifParam = searchParams.get("actif");
  const actif =
    actifParam === null ? null : actifParam === "true";

  const columns = getOperateurColumns({
    onEdit: (op) => router.push(`/operateurs/${op.id}`),
  });

  return (
    <GenericListTable
      data={operateurs}
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
        <OperateurFilters
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
