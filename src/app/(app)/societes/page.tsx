import { listSocietes } from "@/domain/societe/societe-repository";
import type { SocieteView } from "@/domain/societe/societe-types";
import { SocieteToolbar } from "@/ui/societe/list/SocieteToolbar";
import { SocieteList } from "@/ui/societe/list/SocieteList";
import { getCurrentClient } from "@/domain/session/current-client";
import { notFound } from "next/navigation";

interface SocietesProps {
	searchParams: {
		page?: string;
		pageSize?: string;
		search?: string;
		client?: string;
		fournisseur?: string;
	};
}

export default async function SocietesPage({ searchParams }: SocietesProps) {

  const { current } = await getCurrentClient();
  if (!current) notFound();
  if (!current.cltId) notFound();

  const cltId = current.cltId;


	const query = await searchParams;

	const page = Number(query.page ?? "1");
	const pageSize = Number(query.pageSize ?? "10");
	const client = typeof query.client === "string" ? query.client === "true" : undefined;
	const fournisseur = typeof query.fournisseur === "string" ? query.fournisseur === "true" : undefined;
	const search = typeof query.search === "string" ? query.search : undefined;

	const result = await listSocietes({ cltId, page, pageSize, search, client, fournisseur });

	const data: SocieteView[] = result.data;
	const total = result.total;

	const totalPages = Math.max(1, Math.ceil(total / pageSize));

	return (
		<>
			<SocieteToolbar />
			<SocieteList societes={data} page={page} pageSize={pageSize} totalPages={totalPages} />
		</>
	);
}