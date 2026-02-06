



import { notFound } from "next/navigation";
import { getSocieteById } from "@/domain/societe/societe-repository";
import { SocieteEditor } from "@/ui/societe/edit/SocieteEditor";


type Props = {
	params: Promise<{
		societeid: string;
	}>;
};

export default async function EditSocietePage({ params }: Props) {

	const { societeid } = await params;

	//console.log("EditSocietePage", societeid)

	const societe = await getSocieteById(societeid);
	if (!societe) {
		notFound();
	}

	return (
		<SocieteEditor
			initialSociete={societe}
			cltId={""}  
		/>
	);
}




