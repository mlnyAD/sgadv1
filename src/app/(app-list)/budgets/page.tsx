

import { getBudgetScreenData } from "@/features/budget/getbudgetscreen";
import { BudgetScreenClient } from "@/ui/budget/BudgetScreenClient";

export default async function Page(props: {
  searchParams: Promise<{ exerid?: string }>;
}) {
  const sp = await props.searchParams;
  const data = await getBudgetScreenData({ exerid: sp.exerid });
  if (!data) throw new Error("getBudgetScreenData a retourné undefined");

  return (
    <BudgetScreenClient
      exerid={data.exerid}
      exerciseOptions={data.exerciseOptions}
      rows={data.rows}
      salesRows={data.salesRows}
      purchaseRows={data.purchaseRows}
    />
  );
}