

"use client";

import { ProjectValidEtudeField } from "../../fields/options/ProjectValidEtudeField";
import { ProjectValidEtudeCommentsField } from "../../fields/options/ProjectValidEtudeCommentsField";

import { ProjectChoixStField } from "../../fields/options/ProjectChoixStField";
import { ProjectChoixStCommentsField } from "../../fields/options/ProjectChoixStCommentsField";

import { ProjectTravauxSupplField } from "../../fields/options/ProjectTravauxSupplField";
import { ProjectTravauxSupplCommentsField } from "../../fields/options/ProjectTravauxSupplCommentsField";

import { ProjectDecompteDepensesField } from "../../fields/options/ProjectDecompteDepensesField";
import { ProjectDecompteDepensesCommentsField } from "../../fields/options/ProjectDecompteDepensesCommentsField";
import type { ProjectFormState } from "../project.form.types";

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */
interface Props {
  project: ProjectFormState;
  onChange: (p: ProjectFormState) => void;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectOptionsTab({
  project,
  onChange,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Validation des études */}
      <ProjectValidEtudeField
        value={project.project_valid_etude ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_valid_etude: value,
          })
        }
      />

      <ProjectValidEtudeCommentsField
        value={project.project_valid_etude_comments ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_valid_etude_comments: value,
          })
        }
      />

      {/* Choix des sous-traitants */}
      <ProjectChoixStField
        value={project.project_choix_st ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_choix_st: value,
          })
        }
      />

      <ProjectChoixStCommentsField
        value={project.project_choix_st_comments ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_choix_st_comments: value,
          })
        }
      />

      {/* Travaux supplémentaires */}
      <ProjectTravauxSupplField
        value={project.project_valid_travaux_suppl ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_valid_travaux_suppl: value,
          })
        }
      />

      <ProjectTravauxSupplCommentsField
        value={project.project_valid_travaux_suppl_comments ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_valid_travaux_suppl_comments: value,
          })
        }
      />

      {/* Dépenses complémentaires */}
      <ProjectDecompteDepensesField
        value={project.project_decompte_depenses ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_decompte_depenses: value,
          })
        }
      />

      <ProjectDecompteDepensesCommentsField
        value={project.project_decompte_depenses_comments ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_decompte_depenses_comments: value,
          })
        }
      />
    </div>
  );
}

/*

Onglet options"
Validation des études
Commentaires validation études
Demander la validation du choix des sous-traitants
Commentaires validation choix des sous-traitants
Demander la validation des travaux supplémentaires
Commentaires validation des travaux supplémentaires
Demander la validation du décompte des dépenses supplémentaires


*/