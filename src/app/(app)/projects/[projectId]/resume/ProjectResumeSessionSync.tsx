

"use client";

import { useEffect } from "react";

import { useProjectContextStore } from "@/store/sessionStore";
import type { ProjectResumeDTO } from "@/domain/project/projectResume/projectResume.types";

interface ProjectResumeSessionSyncProps {
  project: ProjectResumeDTO;
}

export default function ProjectResumeSessionSync({
  project,
}: ProjectResumeSessionSyncProps) {
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

  return null;
}
