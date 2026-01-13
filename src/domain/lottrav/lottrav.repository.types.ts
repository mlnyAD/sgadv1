

export interface DbLotTravWithOperator {
  lottrav_id: number;
  lottrav_nom: string;
  lottrav_start: string | null;
  lottrav_end: string | null;
  lottrav_status_id: number;
  project_id: number;
  lottrav_resp_id: number | null;
  lmod: string;
  operator: {
    email: string | null;
  }[] | null;
}
