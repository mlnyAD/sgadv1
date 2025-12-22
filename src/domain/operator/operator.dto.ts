/**
 * DTO – Operator list view
 * Représente UNE ligne dans la table Operators
 */

import { UserRoleId } from "@/domain/user/roles/user-role.type";

export interface OperatorListItem {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
  roleLabel: string; 
  metierLabel?: string | null;
  active: boolean;
}

export interface OperatorUpdateInput {
  id: number;
  roleId: 1 | 2 | 3 | 4;
  societeId: number | null;
  metierId: number | null;
  active: boolean;
}

export interface CreateOperatorByAdminInput {
  email: string;
  firstName: string;
  lastName: string;
  roleId: UserRoleId;
  metierId?: number | null;
  societeId?: number | null;
}

export interface OperatorFormValues {
  email?: string;
  firstName?: string;
  lastName?: string;
  roleId: 1 | 2 | 3 | 4;
  societeId: number | null;
  metierId: number | null;
  active: boolean;
}
