

// 1️⃣ DTO (issu du mapper)DTO = ce qui sort de la base / API
export interface ProjectListDTO {
  project_id: number;
  project_ident: string | null;
  project_nom: string | null;
  project_status_id: number;
  project_start: string | null;
  project_end: string | null;
}

// 2️⃣ Row (forme UI – souvent identique au DTO au début)
// Row = ce que consomme la liste
export type ProjectListRow = ProjectListDTO;
