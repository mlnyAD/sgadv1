

import { notFound } from "next/navigation";
import { getExerciceById } from "@/domain/exercice/exercice-repository";
import { ExerciceEditor } from "@/ui/exercice/edit/ExerciceEditor";


type Props = {
	params: Promise<{
		exerciceid: string;
	}>;
};

export default async function EditExercicePage({ params }: Props) {

	const { exerciceid } = await params;

	//console.log("EditExercicePage", exerciceid)

	const exercice = await getExerciceById(exerciceid);
	if (!exercice) {
		notFound();
	}

	return (
		<ExerciceEditor
			initialExercice={exercice}
		/>
	);
}




