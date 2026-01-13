

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LotTravFilters } from "@/ui/lottrav/LotTravFilters";
import type { LotTravStatusOption } from "@/ui/lottrav/LotTravFilters";
import type { LotTravStatusId } from "@/domain/lottrav/lottrav.catalog";

interface Props {
  statuses: LotTravStatusOption[];
}

export function LottravFiltersClient({ statuses }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const statusIdParam = searchParams.get("statusId");

const statusId = statusIdParam
  ? (Number(statusIdParam) as LotTravStatusId)
  : null;

  function onChange(next: {
    search: string;
    statusId: number | null;
  }) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.search) {
      params.set("search", next.search);
    } else {
      params.delete("search");
    }

    if (next.statusId !== null) {
      params.set("statusId", String(next.statusId));
    } else {
      params.delete("statusId");
    }

    // reset pagination
    params.delete("page");

    router.push(`?${params.toString()}`);
  }

  return (
    <LotTravFilters
      initial={{ search, statusId }}
      statuses={statuses}
      onChange={onChange}
    />
  );
}
