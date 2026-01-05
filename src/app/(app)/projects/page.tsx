
export const dynamic = "force-dynamic";


import { ProjectListTable } from "./ProjectListTable";
import { ProjectListToolbar } from "./ProjectListToolbar";
import { getProjectList } from "@/domain/project/projectList/projectList.service";
import { PROJECT_STATUS_GROUPS } from "@/domain/project/project.catalog";


/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type StatusGroupKey = keyof typeof PROJECT_STATUS_GROUPS;

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    status?: string;
  }>;
}

/* ------------------------------------------------------------------ */
/* Page (Server Component - Next.js 16) */
/* ------------------------------------------------------------------ */

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  /* -------------------- Params -------------------- */

  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const pageSize = Number(params.pageSize ?? 10);

  const search = params.search ?? "";

  const rawStatus = params.status;
  const statusGroups: StatusGroupKey[] = rawStatus
    ? (rawStatus.split(",") as StatusGroupKey[])
    : ["ONGOING"]; // défaut cohérent UI + Server

  const statusIds =
    statusGroups.length > 0
      ? statusGroups.flatMap(
          (group) => PROJECT_STATUS_GROUPS[group]
        )
      : null;

  /* -------------------- Data fetching -------------------- */

  const result = await getProjectList({
    page,
    pageSize,
    search,
    statusIds,
  });

  /* -------------------- Render -------------------- */

  return (
    <>
      <ProjectListToolbar />

      <ProjectListTable
        projects={result.items}
        page={page}
        pageSize={pageSize}
        totalPages={result.totalPages}
      />
    </>
  );
}
