

"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BudgetScreen } from "./BudgetScreen";
import { saveBudgetEdits } from "@/features/budget/savebudgetEdits"

import type { BudgetExerciseOption, SalesRow, PurchaseRow } from "@/features/budget/getbudgetscreen";
import type { BudgetDraftRow } from "@/features/budget/budget.types";

export function BudgetScreenClient(props: {
  exerid: string;
  exerciseOptions: BudgetExerciseOption[];
  rows: BudgetDraftRow[];
  salesRows: SalesRow[];
  purchaseRows: PurchaseRow[];
}) {
  const { exerid, exerciseOptions } = props;

  const [salesRows, setSalesRows] = React.useState<SalesRow[]>(props.salesRows);
  const [purchaseRows, setPurchaseRows] = React.useState<PurchaseRow[]>(props.purchaseRows);

  React.useEffect(() => setSalesRows(props.salesRows), [props.salesRows]);
  React.useEffect(() => setPurchaseRows(props.purchaseRows), [props.purchaseRows]);

  const [isSaving, startSaving] = React.useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onExerChange(nextExerid: string) {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("exerid", nextExerid);
    router.push(`${pathname}?${sp.toString()}`);
  }

  function onChangeSalesBudget(revenue_type_id: number, value: number) {
    setSalesRows((prev) =>
      prev.map((r) => (r.revenue_type_id === revenue_type_id ? { ...r, budget_ht_eur: value } : r))
    );
  }

  function onChangePurchaseBudget(cc_id: string, value: number) {
    setPurchaseRows((prev) =>
      prev.map((r) => (r.cc_id === cc_id ? { ...r, budget_ht_eur: value } : r))
    );
  }

  function onSave() {
    startSaving(async () => {
      await saveBudgetEdits({ exerid, salesRows, purchaseRows });
      router.refresh();
    });
  }

  return (
    <BudgetScreen
      title="Budget"
      subtitle="Suivi prévisionnel vs réalisé"
      exerid={exerid}
      exerciseOptions={exerciseOptions}
      onExerChange={onExerChange}
      salesRows={salesRows}
      purchaseRows={purchaseRows}
      isSaving={isSaving}
      onSave={onSave}
      onChangeSalesBudget={onChangeSalesBudget}
      onChangePurchaseBudget={onChangePurchaseBudget}
    />
  );
}