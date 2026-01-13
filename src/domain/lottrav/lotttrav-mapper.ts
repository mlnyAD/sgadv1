


import type { LotTravView } from "./lottrav-view";
import type { LotTravStatusId } from "./lottrav-status";


interface DbLotTravRow {
  lottrav_id: number;
  lottrav_nom: string;
  lottrav_start: string | null;
  lottrav_end: string | null;
  lottrav_status_id: number;
  project_id: number;
  lottrav_resp_id: number | null;
  responsable_email: string | null;
  lmod: string;
}

export function mapDbLotTravToView(
  row: DbLotTravRow
): LotTravView {
  return {
    id: row.lottrav_id,
    nom: row.lottrav_nom,
    start: row.lottrav_start
      ? new Date(row.lottrav_start)
      : null,
    end: row.lottrav_end
      ? new Date(row.lottrav_end)
      : null,
    statusId: row.lottrav_status_id as LotTravStatusId,
    projectId: row.project_id,
    responsableId: row.lottrav_resp_id,
    responsableEmail: row.responsable_email ?? undefined,
    lastModified: new Date(row.lmod),
  };
}


