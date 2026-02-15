



import { notFound } from "next/navigation";
import { getSocieteById } from "@/domain/societe/societe-repository";
import { SocieteEditor } from "@/ui/societe/edit/SocieteEditor";
import { getCurrentClient } from "@/domain/session/current-client";


type Props = {
	params: Promise<{
		societeid: string;
	}>;
};

export default async function EditSocietePage({ params }: Props) {

	const { societeid } = await params;

	//console.log("EditSocietePage", societeid)

	const { current } = await getCurrentClient();

	if (!current) notFound();
	const cltId = current.cltId;
	if (!cltId) notFound();


	const societe = await getSocieteById({
		cltId,
		societeId: societeid,
	});
	if (!societe) {
		notFound();
	}

	return (
		<SocieteEditor
			initialSociete={societe}
		/>
	);
}




