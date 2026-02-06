

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import type { OperClientView } from "@/domain/operclient/operclient-types";
import { getOperClientColumns } from "./OperClientColumns";
import { OperClientFilters } from "./OperClientFilters";

interface Props {
  associations: OperClientView[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export function OperClientList({
  associations,
  page,
  pageSize,
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* -------------------- Filtres texte -------------------- */

  const operateur = searchParams.get("operateur");
  const client = searchParams.get("client");

  /* -------------------- Colonnes -------------------- */

  const columns = getOperClientColumns({
    onDelete: (assoc) => {
      router.push(`/operclients/${assoc.id}/delete`);
    },
  });

  return (
    <GenericListTable
      data={associations}
      columns={columns}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={(nextPage) => {
        router.push(
          `?page=${nextPage}&pageSize=${pageSize}${
            operateur ? `&operateur=${operateur}` : ""
          }${
            client ? `&client=${client}` : ""
          }`
        );
      }}
      onPageSizeChange={(nextPageSize) => {
        router.push(
          `?page=1&pageSize=${nextPageSize}${
            operateur ? `&operateur=${operateur}` : ""
          }${
            client ? `&client=${client}` : ""
          }`
        );
      }}
      filtersSlot={
        <OperClientFilters
          operateur={operateur}
          client={client}
          onChange={(next) => {
            const params = new URLSearchParams(
              searchParams.toString()
            );

            if (next.operateur) {
              params.set("operateur", next.operateur);
            } else {
              params.delete("operateur");
            }

            if (next.client) {
              params.set("client", next.client);
            } else {
              params.delete("client");
            }

            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
        />
      }
    />
  );
}

