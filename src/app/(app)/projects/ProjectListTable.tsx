

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import { projectColumns, selectableColumns } from "./columns";
import { ProjectListFilters } from "./ProjectListFilters";
import { PROJECT_STATUS_GROUPS } from "@/domain/project/project.catalog";
import type { ProjectListRow } from "@/domain/project/projectList/projectList.types";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type StatusGroupKey = keyof typeof PROJECT_STATUS_GROUPS;

interface ProjectListTableProps {
  projects: ProjectListRow[];
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function ProjectListTable({
  projects,
  page,
  pageSize,
  totalPages,
}: ProjectListTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* -------------------- Filters (URL → state) -------------------- */

  const search = searchParams.get("search") ?? "";

  const rawStatus = searchParams.get("status");
  const statusGroups: StatusGroupKey[] = rawStatus
    ? (rawStatus.split(",") as StatusGroupKey[])
    : ["ONGOING"]; // défaut

  function onFiltersChange(next: {
    search: string;
    statusGroups: StatusGroupKey[];
  }) {
    const params = new URLSearchParams(searchParams.toString());

    // recherche
    if (next.search) params.set("search", next.search);
    else params.delete("search");

    // groupes d’états
    if (next.statusGroups.length > 0) {
      params.set("status", next.statusGroups.join(","));
    } else {
      params.delete("status");
    }

    // reset pagination
    params.set("page", "1");

    router.push(`/projects?${params.toString()}`);
  }

  /* -------------------- Pagination -------------------- */

  function onPageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("pageSize", String(pageSize));
    router.push(`/projects?${params.toString()}`);
  }

  function onPageSizeChange(size: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("pageSize", String(size));
    router.push(`/projects?${params.toString()}`);
  }

  /* -------------------- Render -------------------- */

  return (
    <GenericListTable
      data={projects}
      columns={projectColumns}
      selectableColumns={selectableColumns}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      filtersSlot={
        <ProjectListFilters
          initial={{
            search,
            statusGroups,
          }}
          onChange={onFiltersChange}
        />
      }
    />
  );
}
