

"use client";

import { TableHeader } from "@/components/transaction/TableHeader";
import { AboutCard } from "./AboutCard";

export function AboutTransaction() {
  const version =
    process.env.NEXT_PUBLIC_APP_VERSION ?? "N/C";
  const date =
    process.env.NEXT_PUBLIC_APP_VERSION_DATE ?? "N/C";

  const projectName =
    process.env.NEXT_PUBLIC_APP_PROJECTNAME ??
    "Application";

  const description =
    process.env.NEXT_PUBLIC_APP_PROJECTDESCRIPTION ??
    "Description";

  return (
    <div className="mx-auto w-full space-y-4">
      <TableHeader
        title={`${projectName} - Version ${version} du ${date}`}
        subtitle={description}
      />

      <AboutCard />
    </div>
  );
}
