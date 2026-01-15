

import { notFound } from "next/navigation";

import { fetchProjectResume } from "@/domain/project/projectResume/projectResume.service";
import type { ProjectResumeDTO } from "@/domain/project/projectResume/projectResume.types";
import ProjectResumeHydrator from "./ProjectResumeHydrator";

import ProjectResumeInfo from "./ProjectResumeInfo";
import ProjectResumePhoto from "./ProjectResumePhoto";
import ProjectResumeActions from "./ProjectResumeActions";

interface ProjectResumePageProps {
  params: Promise<{
    projectid: string;
  }>;
}

export default async function ProjectResumePage({
  params,
}: ProjectResumePageProps) {
  
  // ⚠️ Next 15+ : params est une Promise
  const { projectid } = await params;

   const projectId = Number(projectid);

  // Sécurisation URL
  if (!projectId) {
    notFound();
  }

  const id = Number(projectId);

  if (Number.isNaN(id)) {
    notFound();
  }

  // Lecture projet (pivot)
  const project: ProjectResumeDTO | null = await fetchProjectResume(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="p-6 space-y-6">

    {/* Hydratation du Header */}
    <ProjectResumeHydrator project={project} />

      {/* ───────────────────────────────────────────── */}
      {/* TITRE DE PAGE */}
      {/* ───────────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-semibold">
          Résumé du projet
        </h1>
      </div>

      {/* ───────────────────────────────────────────── */}
      {/* INFOS PROJET + PHOTO */}
      {/* ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Infos projet (gauche) */}
        <div className="md:col-span-2">
          <ProjectResumeInfo project={project} />
        </div>

        {/* Photo projet (droite) */}
        <div className="md:col-span-1">
          <ProjectResumePhoto project={project} />
        </div>

      </div>

      {/* ───────────────────────────────────────────── */}
      {/* ACTIONS PROJET */}
      {/* ───────────────────────────────────────────── */}
      <ProjectResumeActions projectId={id} />

    </div>
  );
}
