

export type BudgetKindDb = "SALES" | "PURCHASE";

export function toBudgetKindDb(kind: 1 | 2): BudgetKindDb {
  return kind === 1 ? "SALES" : "PURCHASE";
}

export function fromBudgetKindDb(kind: BudgetKindDb): 1 | 2 {
  return kind === "SALES" ? 1 : 2;
}