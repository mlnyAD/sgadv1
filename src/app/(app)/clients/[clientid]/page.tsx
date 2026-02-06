

import { notFound } from "next/navigation";
import { getClientById } from "@/domain/client/client-repository";
import { ClientEditor } from "@/ui/client/edit/ClientEditor";


type Props = {
	params: Promise<{
		clientid: string;
	}>;
};

export default async function EditClientPage({ params }: Props) {

	const { clientid } = await params;

	//console.log("EditClientPage", clientid)

	const client = await getClientById(clientid);
	if (!client) {
		notFound();
	}

	return (
		<ClientEditor
			initialClient={client}
		/>
	);
}




