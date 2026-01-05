

import { notFound } from "next/navigation";
import { getProjectDbViewById } from "@/domain/project/project.repository";
import { mapProjectDbViewToDbRow } from "@/domain/project/project.mapper";
import { ProjectForm } from "../../components/form/ProjectForm";
import { getSocietesForSelect } from "@/domain/societe/societe.repository";


export default async function ProjectEditPage(
  props: {
    params: Promise<{ projectId: string }>;
  }
) {
  const { projectId } = await props.params;

  const id = Number(projectId);
  if (Number.isNaN(id)) {
    notFound();
  }

  const view = await getProjectDbViewById(id);
  if (!view) {
    notFound();
  }

  const project = mapProjectDbViewToDbRow(view);

  const societes = await getSocietesForSelect();

const moaOptions = societes.map((s) => ({
  id: s.societe_id,
  label: s.societe_nom,
}));

  return (
    <ProjectForm
		  mode="edit"
		  projectId={id}
		  initialProject={project} 
		   moaOptions={moaOptions} 
	 />
  );
}
