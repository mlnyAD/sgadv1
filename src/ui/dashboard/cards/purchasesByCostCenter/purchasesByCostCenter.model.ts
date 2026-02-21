

export type PurchasesByCostCenterItem = {
  label: string;
  budgetEur: number;
  realizedEur: number;
};

export type PurchasesByCostCenterCardModel = {
  items: PurchasesByCostCenterItem[];
};