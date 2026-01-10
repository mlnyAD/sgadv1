

"use client";

import {
  createProjectAction,
  updateProjectAction,
} from "@/app/(app)/projects/actions/project.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { ProjectFormState } from "./project.form.types";
import { mapProjectFormToDb } from "./project.form.mapper";

export interface ProjectFormActionsProps {
  mode: "create" | "edit";
  project: ProjectFormState;
  projectId?: number;
}

export function ProjectFormActions({
  mode,
  project,
  projectId,
}: ProjectFormActionsProps) {
  const router = useRouter();

  async function handleSave() {
    const payload = mapProjectFormToDb(project);

    if (mode === "create") {
      await createProjectAction(payload);
    } else if (projectId) {
      await updateProjectAction(projectId, payload);
    }

    router.back();
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="secondary"
        onClick={() => router.back()}
      >
        Annuler
      </Button>

      <Button
        type="button"
        onClick={handleSave}
      >
        Enregistrer
      </Button>
    </div>
  );
}
