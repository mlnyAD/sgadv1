

// src/app/(app)/dashboard/page.tsx

import { getDashboardData } from "@/features/dashboard/getdashboarddata";
import { DashboardScreen } from "@/ui/dashboard/DashboardScreen";

export default async function Page() {
  const data = await getDashboardData();

  if (!data) {
    return (
      <div className="p-6">
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          L&apos;affichage du dashboard est impossible car il n&apos;y a pas d&apos;exercice actif valide.
        </div>
      </div>
    );
  }

  return <DashboardScreen data={data} />;
}