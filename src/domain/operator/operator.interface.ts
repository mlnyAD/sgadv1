// src/domain/operator/operator.interface.ts

// src/domain/operator/operator.interface.ts

export interface Operator {
  id: number;                // correspondra à operator_id
  roleId: number;            // role_id dans la table operator
  metierId?: number | null;  // metier_id dans la table operator
  societeId?: number | null; // à mapper quand tu auras la colonne en base
  active: boolean;           // champ logique (peut venir de operator ou user)

  // Ces champs sont utilisés dans OperatorForm.tsx et dans la liste
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface OperatorListItem {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
  metierLabel?: string | null;
  societeName?: string | null;
}

export interface OperatorListParams {
  page: number;
  pageSize: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
