/**
 * Shape DB – vue vw_operator_view
 */
export interface OperatorRow {
  operator_id: number;
  active: boolean;
  role_id: number;

  first_name: string;
  last_name: string;
  email: string;

  metier_label: string | null;
  societe_name: string | null;
}
