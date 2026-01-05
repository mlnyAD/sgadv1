

import { Button } from "@/components/ui/button";
import type { ProjectDbRow } from "@/domain/project/project.db";

interface Props {
  mode: "create" | "edit";
  project: ProjectDbRow;
  projectId?: number;
}

export function ProjectFormActions({
  mode,
  project,
  projectId,
}: Props) {
  async function onSave() {
    const url =
      mode === "create"
        ? "/api/projects"
        : `/api/projects/${projectId}`;

    const method = mode === "create" ? "POST" : "PATCH";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
  }

  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline">Annuler</Button>
      <Button onClick={onSave}>
        {mode === "create" ? "Créer" : "Enregistrer"}
      </Button>
    </div>
  );
}
