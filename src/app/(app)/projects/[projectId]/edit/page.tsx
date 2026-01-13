

import { notFound } from "next/navigation";

import { getProjectDbViewById } from "@/domain/project/project.repository";
import { mapProjectDbViewToDbRow } from "@/domain/project/project.mapper";

import { getSocietesForSelect } from "@/domain/societe/societe.repository";
import { getConfigsByType } from "@/domain/config/config.repository";

import type { SelectOption } from "@/components/fields/types";
import type { ConfigDbRow } from "@/domain/config/config.db";

import { ProjectForm } from "../../components/form/ProjectForm";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectEditPage({ params }: PageProps) {
  /* ------------------------------------------------------------------
     Params
     ------------------------------------------------------------------ */

  const { projectId } = await params;
  const id = Number(projectId);

  if (Number.isNaN(id)) {
    notFound();
  }

  /* ------------------------------------------------------------------
     Project
     ------------------------------------------------------------------ */

  const view = await getProjectDbViewById(id);
  if (!view) {
    notFound();
  }

  const project = mapProjectDbViewToDbRow(view);

  /* ------------------------------------------------------------------
     Options (SelectOption)
     ------------------------------------------------------------------ */

  const societes = await getSocietesForSelect();

  const moaOptions: SelectOption[] = societes.map((s) => ({
    value: s.societe_id.toString(),
    label: s.societe_nom,
  }));

  const ouvrageOptions: SelectOption[] = (await getConfigsByType(6)).map(
    (c: ConfigDbRow) => ({
      value: c.config_id.toString(),
      label: c.config_nom,
    })
  );

  const motifOptions: SelectOption[] = (await getConfigsByType(7)).map(
    (c: ConfigDbRow) => ({
      value: c.config_id.toString(),
      label: c.config_nom,
    })
  );

  const budgetOptions: SelectOption[] = (await getConfigsByType(4)).map(
    (c: ConfigDbRow) => ({
      value: c.config_id.toString(),
      label: c.config_nom,
    })
  );

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */

  return (
    <ProjectForm
      mode="edit"
      projectId={id}
      initialProject={project}
      moaOptions={moaOptions}
      ouvrageOptions={ouvrageOptions}
      motifOptions={motifOptions}
      budgetOptions={budgetOptions}
    />
  );
}
