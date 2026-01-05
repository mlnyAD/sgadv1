
// /domain/projectResume/projectResume.mapper.ts

import { ProjectResume } from "./projectResume.types";

export function mapProjectResume(raw: any): ProjectResume {
  return {
    projectId: raw.project_id,
    projectIdent: raw.project_ident,
    projectName: raw.project_nom,
    description: raw.project_descript,

    address: raw.project_address,

    startDate: raw.project_start,
    endDate: raw.project_end,
    durationDays: raw.project_duree_vie,

    projectManager: raw.project_manager,
    statusLabel: raw.project_status_label,

    progressPercent: raw.project_progress_percent,
    projectPhotoKey: raw.project_photo,
  };
}
