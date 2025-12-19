import { OperatorRow } from "./operator.types";
import { OperatorListItem } from "./operator.dto";
import { USER_ROLES } from "@/domain/user/roles/user-role.enum";

/**
 * Traduction role_id → libellé métier
 */
function getRoleLabel(roleId: number): string {
  const role = Object.values(USER_ROLES).find(
    (r) => r.id === roleId
  );

  return role?.label ?? "Inconnu";
}

export function mapOperatorRowToListItem(
  row: OperatorRow
): OperatorListItem {
  return {
    id: row.operator_id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    roleId: row.role_id, 
    roleLabel: getRoleLabel(row.role_id),
    metierLabel: row.metier_label,
    active: row.active,
  };
}

export function mapOperatorRowsToListItems(
  rows: OperatorRow[]
): OperatorListItem[] {
  return rows.map(mapOperatorRowToListItem);
}
