"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import { societeColumns } from "./columns";
import { SocieteListItem } from "@/domain/societe/societe-list-item";

interface SocietesTableProps {
  data: SocieteListItem[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export function SocietesTable({
  data,
  page,
  pageSize,
  totalPages,
}: SocietesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => params.set(k, v));
    router.push(`/societes?${params.toString()}`);
  }

  return (
    <GenericListTable
      data={data}
      columns={societeColumns}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={(p) =>
        updateParams({ page: String(p), pageSize: String(pageSize) })
      }
      onPageSizeChange={(s) =>
        updateParams({ page: "1", pageSize: String(s) })
      }
    />
  );
}
