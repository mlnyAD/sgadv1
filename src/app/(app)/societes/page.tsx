import { listSocietes } from "@/domain/societe";
import { SocietesTable } from "./SocietesTable";
import { SocietesToolbar } from "./SocietesToolbar";

interface SocietesPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
}

export default async function SocietesPage({
  searchParams,
}: SocietesPageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const pageSize = Number(params.pageSize ?? "10");
  const search =
    typeof params.search === "string"
      ? params.search
      : undefined;

  const { data, total } = await listSocietes({
    page,
    pageSize,
    search,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <SocietesToolbar />

      <SocietesTable
        data={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
