

import type { ProjectDbRow } from "@/domain/project/project.db";
import {
  ProjectMOAField,
  ProjectMoaOption,
} from "../../fields/intervenants/ProjectMOAField";

interface Props {
  project: ProjectDbRow;
  onChange: (next: ProjectDbRow) => void;
  moaOptions: ProjectMoaOption[];
}

export function ProjectIntervenantsTab({
  project,
  onChange,
  moaOptions,
}: Props) {
  function update<K extends keyof ProjectDbRow>(
    key: K,
    value: ProjectDbRow[K]
  ) {
    onChange({
      ...project,
      [key]: value,
    });
  }

  return (
    <div className="grid grid-cols-1 gap-1">
		
      <ProjectMOAField
        value={project.project_moa_id ?? null}
        options={moaOptions}
        onChange={(value) =>
          update("project_moa_id", value)
        }
      />
    </div>
  );
}
