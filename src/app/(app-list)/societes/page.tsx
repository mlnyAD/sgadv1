

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { listSocietes } from "@/domain/societe/societe-repository";
import { SocieteList } from "@/ui/societe/list/SocieteList";
import { SocieteToolbar } from "@/ui/societe/list/SocieteToolbar";

interface Props {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    role?: string;
  }>;
}

export default async function SocietePage({ searchParams }: Props) {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/societes",
  });

  if (!current?.cltId) notFound();

  const cltId = current.cltId;
  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");
  const search = typeof query.search === "string" ? query.search : undefined;
  const role = typeof query.role === "string" ? query.role : "";

  let client: boolean | undefined = undefined;
  let fournisseur: boolean | undefined = undefined;

  if (role === "client") {
    client = true;
  } else if (role === "fournisseur") {
    fournisseur = true;
  } else if (role === "both") {
    client = true;
    fournisseur = true;
  }

  const { data, total } = await listSocietes({
    cltId,
    page,
    pageSize,
    search,
    client,
    fournisseur,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <SocieteToolbar />

      <SocieteList
        societes={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}