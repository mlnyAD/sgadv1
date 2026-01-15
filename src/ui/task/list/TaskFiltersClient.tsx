

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TaskFilters } from "@/ui/task/list/TaskFilters";
import type { TaskStatusOption } from "@/ui/task/list/TaskFilters";
import type { TaskStatusId } from "@/domain/task/task-status";

interface Props {
  statuses: TaskStatusOption[];
}

export function TaskFiltersClient({ statuses }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const etatIdParam = searchParams.get("etatId");
  const etatId = etatIdParam
    ? (Number(etatIdParam) as TaskStatusId)
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
      params.set("etatId", String(next.statusId));
    } else {
      params.delete("etatId");
    }

    // reset pagination
    params.delete("page");

    router.push(`?${params.toString()}`);
  }

  return (
    <TaskFilters
      initial={{ search, statusId: etatId }}
      statuses={statuses}
      onChange={onChange}
    />
  );
}
