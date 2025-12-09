// src/app/(app)/operators/operatorList/OperatorList.tsx
"use client";

import { useState } from "react";
import { OperatorListItem, PaginatedResult } from "@/domain/operator/operator.interface";
import { OperatorDataTable } from "./operatorDataTable";

interface OperatorListProps {
  initialData: PaginatedResult<OperatorListItem>;
}

export function OperatorList({ initialData }: OperatorListProps) {
  const [data, setData] = useState(initialData);

  // TODO: si tu veux gérer le changement de page côté client via server actions,
  // tu pourras appeler une action server pour recharger les données.

  return (
    <OperatorDataTable data={data} />
  );
}
