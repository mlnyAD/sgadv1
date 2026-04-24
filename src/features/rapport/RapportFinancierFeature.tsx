

// src/features/rapport/RapportFinancierFeature.tsx
 
"use client";

import { useRapportFinancier } from "./hooks/useRapportFinancier";
import { RapportFinancierScreen } from "@/ui/rapport/RapportFinancierScreen";

type Props = {
  clientId: string;
  clientName: string;
};

export function RapportFinancierFeature(props: Props) {
  const rapport = useRapportFinancier(props);

  return <RapportFinancierScreen {...rapport} />;
}