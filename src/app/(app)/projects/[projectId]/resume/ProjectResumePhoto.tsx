

"use client";

import Image from "next/image";
import type { ProjectResumeDTO } from "@/domain/project/projectResume/projectResume.types";

interface ProjectResumePhotoProps {
  project: ProjectResumeDTO;
}

export default function ProjectResumePhoto({
  project,
}: ProjectResumePhotoProps) {
  // ✅ Cas NORMAL : pas de photo au démarrage
  if (!project.project_photo) {
    return (
      <div className="border rounded-md p-4 h-full min-h-[200px] flex items-center justify-center text-sm text-muted-foreground">
        Aucune photo disponible
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden relative h-full min-h-[200px]">
      <Image
        src={project.project_photo}
        alt="Photo du projet"
        fill
        className="object-cover"
        sizes="(min-width: 768px) 33vw, 100vw"
      />
    </div>
  );
}
