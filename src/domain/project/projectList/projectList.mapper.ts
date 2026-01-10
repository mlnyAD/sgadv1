

import type { ProjectListDTO, ProjectListRow } from "./projectList.types";

export function mapProjectListRow(row: ProjectListRow): ProjectListDTO {


  //console.log("Project mapper row ", row)

  return {
    project_id: row.project_id,
    project_ident: row.project_ident,
    project_nom: row.project_nom,
    project_status_id: row.project_status_id,
    project_start: row.project_start,
    project_end: row.project_end,
  };
}
