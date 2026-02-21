

"use client";

import type { DashboardData } from "@/features/dashboard/dashboard.types";
import type { InvoicesCardModel } from "./invoices.model";
import { InvoicesCardView } from "./InvoicesCard.view";

function selectInvoicesModel(data: DashboardData): InvoicesCardModel {
  return {
    emittedHt: data.receivables.emittedHt ?? 0,
    paid: data.receivables.paid ?? 0,
    dueNotLate: data.receivables.dueNotLate ?? 0,
    dueLate: data.receivables.dueLate ?? 0,
  };
}

export function InvoicesCard(props: { data: DashboardData }) {
  return <InvoicesCardView model={selectInvoicesModel(props.data)} />;
}