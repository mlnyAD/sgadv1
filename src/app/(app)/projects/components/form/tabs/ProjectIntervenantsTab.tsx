

"use client";

import type { ProjectFormState } from "../project.form.types";
import type { SelectOption } from "@/components/fields/types";

import { ProjectMOAField } from "../../fields/intervenants/ProjectMOAField";
import { ProjectPiloteField } from "../../fields/intervenants/ProjectPiloteField";
import { ProjectResponsableField } from "../../fields/intervenants/ProjectResponsableField";

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  project: ProjectFormState;
  onChange: (p: ProjectFormState) => void;
  moaOptions: SelectOption[];
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectIntervenantsTab({
  project,
  onChange,
  moaOptions,
}: Props) {
  
  return (
    <div className="space-y-4">
      {/* Maître d’ouvrage */}
      <ProjectMOAField
        value={project.project_moa_id}
        options={moaOptions}
        onChange={(value) =>
          onChange({
            ...project,
            project_moa_id: value,
          })
        }
      />

      {/* Chef de projet */}
      <ProjectPiloteField
        value={project.project_pilote ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_pilote: value,
          })
        }
      />

      {/* Responsable */}
      <ProjectResponsableField
        value={project.project_responsable ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_responsable: value,
          })
        }
      />
    </div>
  );
}
