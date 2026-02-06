

import { notFound } from "next/navigation";
import { getCentreCoutById } from "@/domain/centre-cout/centre-cout-repository";
import { CentreCoutEditor } from "@/ui/centre-cout/edit/CentreCoutEditor";
import { listClients } from "@/domain/client/client-repository";


type Props = {
	params: Promise<{
		ccid: string;
	}>;
};

export default async function EditCentreCoutPage({ params }: Props) {

	const { ccid } = await params;

	//console.log("EditCentreCoutPage", ccid);

	const centreCout = await getCentreCoutById(ccid);
	if (!centreCout) {
		notFound();
	}
	const { data: clients } = await listClients({
  page: 1,
  pageSize: 1000,
  actif: true,
});


const clientOptions = Array.from(
  new Map(
    clients.map((c) => [c.id, { id: c.id, nom: c.nom }])
  ).values()
);


	return (
		<CentreCoutEditor
			initialCentreCout={centreCout}
			  clients={clientOptions}
		/>
	);
}
