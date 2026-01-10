

import type { ProjectDbRow } from "@/domain/project/project.db";
import { ProjectIdentField } from "../../fields/general/ProjectIdentField";
import { ProjectNameField } from "../../fields/general/ProjectNameField";
import { ProjectDescriptionField } from "../../fields/general/ProjectDescriptionField";
import { ProjectAddressField } from "../../fields/general/ProjectAddressField";
import { ProjectPostalCodeField } from "../../fields/general/ProjectPostalCodeField";
import { ProjectTownField } from "../../fields/general/ProjectTownField";
import { ProjectStatusField } from "../../fields/general/ProjectStatusField";
import type { ProjectFormState } from "../project.form.types";

interface Props {
  project: ProjectFormState;
  onChange: (p: ProjectFormState) => void;
}
export function ProjectGeneralTab({ project, onChange }: Props) {
  function update<K extends keyof ProjectDbRow>(
    key: K,
    value: ProjectDbRow[K]
  ) {
    onChange({
      ...project,
      [key]: value,
    });
  }

  //console.log("ProjectGeneralTab project = ", project)
  return (
    <div className="grid grid-cols-1 gap-1">

      <ProjectIdentField
        value={project.project_ident}
        onChange={(value) =>
          onChange({
            ...project,
            project_ident: value,
          })
        }
      />
      <ProjectNameField
        value={project.project_nom}
        onChange={(value) =>
          update("project_nom", value)
        }
      />

      <ProjectDescriptionField
        value={project.project_descript ?? ""}
        onChange={(value) =>
          update("project_descript", value || null)
        }
      />

      <ProjectAddressField
        value={project.project_adresse ?? ""}
        onChange={(value) =>
          update("project_adresse", value || null)
        }
      />

      <ProjectPostalCodeField
        value={project.project_code_postal ?? ""}
        onChange={(value) =>
          update("project_code_postal", value || null)
        }
      />

      <ProjectTownField
        value={project.project_ville ?? ""}
        onChange={(value) =>
          update("project_ville", value || null)
        }
      />

      <ProjectStatusField
        value={project.project_status_id || null}
        onChange={(value) =>
          update("project_status_id", value)
        }
      />
    </div>
  );
}
