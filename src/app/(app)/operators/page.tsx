import { listOperators } from "@/domain/operator/operator.repository";
import { OperatorsTable } from "./OperatorsTable";
import { OperatorsToolbar } from "./OperatorsToolbar";

interface OperatorsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function OperatorsPage({
  searchParams,
}: OperatorsPageProps) {
  /* ------------------------------------------------------------------
     Lecture et normalisation des paramètres URL
     ------------------------------------------------------------------ */
 const params = await searchParams;

  const page =
    typeof params.page === "string"
      ? Number(params.page)
      : 1;

  const pageSize =
    typeof params.pageSize === "string"
      ? Number(params.pageSize)
      : 10;

  const search =
    typeof params.search === "string"
      ? params.search
      : undefined;

  const roleId =
    typeof params.roleId === "string"
      ? Number(params.roleId)
      : undefined;

  const active =
    typeof params.active === "string"
      ? params.active === "true"
      : undefined;

  const { items, totalPages } = await listOperators({
    page,
    pageSize,
    search,
    roleId,
    active,
  });

  return (
    <>
      <OperatorsToolbar />
      <OperatorsTable
        data={items}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
