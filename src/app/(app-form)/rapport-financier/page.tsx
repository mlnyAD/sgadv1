

// app/.../rapport-financier/page.tsx

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { RapportFinancierFeature } from "@/features/rapport/RapportFinancierFeature";

export default async function Page() {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/fisc",
  });

  if (!current?.cltId) {
    notFound();
  }

  return (
    <RapportFinancierFeature
      clientId={current.cltId}
      clientName={current.cltNom ?? "Client"}
    />
  );
}