

"use client";

import { useEffect } from "react";
import { useProjectContextStore } from "@/store/sessionStore";
import type { ProjectResumeDTO } from "@/domain/project/projectResume/projectResume.types";

interface ProjectResumeHydratorProps {
  project: ProjectResumeDTO;
}

export default function ProjectResumeHydrator({
  project,
}: ProjectResumeHydratorProps) {
  const setProjectContext = useProjectContextStore(
    (s) => s.setProjectContext
  );

  useEffect(() => {
    setProjectContext({
      projectId: project.project_id,
      projectNom: project.project_nom,
      projectIdent: project.project_ident,
    });
  }, [project, setProjectContext]);

  return null; // composant invisible
}
