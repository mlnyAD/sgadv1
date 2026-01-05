
// /domain/projectResume/projectResume.types.ts

export type ProjectResume = {
  projectId: number;
  projectIdent: string;
  projectName: string;
  description?: string;

  address?: string;

  startDate?: string;
  endDate?: string;
  durationDays?: number;

  projectManager?: string;

  statusLabel?: string;

  progressPercent?: number;

  projectPhotoKey?: string;
};

export interface ProjectResumeDTO {
  project_id: number;
  project_nom: string | null;
  project_ident: string | null;
  project_pilote: string | null;
  project_descript: string | null;
  project_adresse: string | null;
  project_code_postal: string | null;
  project_ville: string | null;
  project_start: string | null;
  project_end: string | null;
  project_reception_actu: string | null;
  project_duree_vie: number | null;
  project_photo: string | null;
}
