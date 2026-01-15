

import type { ProjectResumeDTO } from "@/domain/project/projectResume/projectResume.types";

interface ProjectResumeInfoProps {
  project: ProjectResumeDTO;
}
export default function ProjectResumeInfo({
  project,
}: ProjectResumeInfoProps) {
  return (
    <div className="space-y-4 border rounded-md p-4">

      <h2 className="text-lg font-semibold">
        Informations du projet
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm">

        <div>
          <span className="text-muted-foreground">Nom du projet</span>
          <div>{project.project_nom}</div>
        </div>

        <div>
          <span className="text-muted-foreground">Identifiant</span>
          <div>{project.project_ident}</div>
        </div>

        <div>
          <span className="text-muted-foreground">Chef de projet</span>
          <div>{project.project_pilote}</div>
        </div>

        <div>
          <span className="text-muted-foreground">Adresse</span>
          <div>
            {project.project_adresse} – {project.project_code_postal} – {project.project_ville}
          </div>
        </div>

        <div>
          <span className="text-muted-foreground">Date de début</span>
          <div>{project.project_start}</div>
        </div>

        <div>
          <span className="text-muted-foreground">Date de fin</span>
          <div>{project.project_end ?? project.project_reception_actu}</div>
        </div>

        <div>
          <span className="text-muted-foreground">Durée</span>
          <div>{project.project_duree_vie} jours</div>
        </div>

        <div>
          <span className="text-muted-foreground">% Avancement</span>
          <div>—</div>
        </div>

        <div className="col-span-2">
          <span className="text-muted-foreground">Description</span>
          <div className="line-clamp-3">
            {project.project_descript}
          </div>
        </div>

      </div>
    </div>
  );
}
