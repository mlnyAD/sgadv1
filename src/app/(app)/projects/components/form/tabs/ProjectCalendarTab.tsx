

"use client";

import { ProjectCreationDateField } from "../../fields/calendar/ProjectCreationDateField";
import { ProjectStartDateField } from "../../fields/calendar/ProjectStartDateField";
import { ProjectEndDateField } from "../../fields/calendar/ProjectEndDateField";
import { ProjectDureeVieField } from "../../fields/calendar/ProjectDureeVieField";
import { ProjectReceptionInitDateField } from "../../fields/calendar/ProjectReceptionInitDateField";
import { ProjectReceptionActuDateField } from "../../fields/calendar/ProjectReceptionActuDateField";
import { ProjectLivraisonInitDateField } from "../../fields/calendar/ProjectLivraisonInitDateField";
import { ProjectLivraisonActuDateField } from "../../fields/calendar/ProjectLivraisonActuDateField";
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

export function ProjectCalendarTab({
  project,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Date de création (informatif) */}
      <ProjectCreationDateField
        value={project.project_creation ?? null}
      />

      {/* T0 du projet */}
      <ProjectStartDateField
        value={project.project_start ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_start: value,
          })
        }
      />

      {/* Fin contractuelle */}
      <ProjectEndDateField
        value={project.project_end ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_end: value,
          })
        }
      />

      {/* Durée de vie */}
      <ProjectDureeVieField
        value={project.project_duree_vie ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_duree_vie: value,
          })
        }
      />

      {/* Réception */}
      <ProjectReceptionInitDateField
        value={project.project_reception_init ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_reception_init: value,
          })
        }
      />

      <ProjectReceptionActuDateField
        value={project.project_reception_actu ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_reception_actu: value,
          })
        }
      />

      {/* Livraison */}
      <ProjectLivraisonInitDateField
        value={project.project_livraison_init ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_livraison_init: value,
          })
        }
      />

      <ProjectLivraisonActuDateField
        value={project.project_livraison_actu ?? null}
        onChange={(value) =>
          onChange({
            ...project,
            project_livraison_actu: value,
          })
        }
      />
    </div>
  );
}

/*
Onglet "calendrier"
Date de création du projet
T0 du projet
Fin contractuelle du projet
Durée du projet (mois)
Date initiale de réception
Date actualisée de réception
Date initiale de livraison
Date actualisée de livraison


*/