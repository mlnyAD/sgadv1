

"use client";

import { ProjectCommentairesField } from "../../fields/motifs/ProjectCommentairesField";
import { ProjectMotifField } from "../../fields/motifs/ProjectMotifField";
import { ProjectOuvrageField } from "../../fields/motifs/ProjectOuvrageField";
import type { ProjectFormState } from "../project.form.types";
import type { SelectOption } from "@/app/(app)/components/fields/types";

interface Props {
  project: ProjectFormState;
  onChange: (p: ProjectFormState) => void;

  ouvrageOptions: SelectOption[];
  motifOptions: SelectOption[];
}

export function ProjectMotifsTab({
  project,
  onChange,
  ouvrageOptions,
  motifOptions,
}: Props) {

  return (
    <div className="grid grid-cols-1 gap-1">


      <ProjectOuvrageField
        value={project.project_ouvrage_id ?? ""}
        options={ouvrageOptions}
        onChange={(value) =>
          onChange({
            ...project,
            project_ouvrage_id: value,
          })
        }
      />

      <ProjectMotifField
        value={project.project_motif_id ?? ""}
        options={motifOptions}
        onChange={(value) =>
          onChange({
            ...project,
            project_motif_id: value,
          })
        }
      />

      <ProjectCommentairesField
        value={project.project_valid_travaux_suppl_comments ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_valid_travaux_suppl_comments: value,
          })
        }
      />

    </div>
  );
}
