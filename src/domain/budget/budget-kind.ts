

// src/domain/budget/budget-kind.ts

export type BudgetKind = 1 | 2;
export type BudgetKindDb = "SALES" | "PURCHASE";

export function toBudgetKindDb(kind: BudgetKind): BudgetKindDb {
  return kind === 1 ? "SALES" : "PURCHASE";
}

export function fromBudgetKindDb(kind: BudgetKindDb): BudgetKind {
  return kind === "SALES" ? 1 : 2;
}