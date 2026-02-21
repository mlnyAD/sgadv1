

// src/app/(app)/dashboard/page.tsx

import { getDashboardData } from "@/features/dashboard/getdashboarddata";
import { DashboardScreen } from "@/ui/dashboard/DashboardScreen";

export default async function Page() {
  const data = await getDashboardData(); // mock au départ
  return <DashboardScreen data={data} />;
}