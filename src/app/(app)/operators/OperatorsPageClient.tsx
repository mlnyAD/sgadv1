// src/app/(app)/operators/OperatorsPageClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { OperatorList } from "./operatorList/OperatorList";
import { PaginatedResult, OperatorListItem } from "@/domain/operator/operator.interface";

interface OperatorsPageClientProps {
  initialData: PaginatedResult<OperatorListItem>;
}

export function OperatorsPageClient({ initialData }: OperatorsPageClientProps) {
  const router = useRouter();

  const handleNew = () => {
    router.push("/operators/new"); // ou "/operators/0" selon ton pattern configs
  };

  const handleClose = () => {
    router.push("/dashboard"); // TODO: adapter la route de retour
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Opérateurs</h1>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={handleClose}>
            Fermer
          </button>
          <button className="btn btn-primary" onClick={handleNew}>
            Nouvel opérateur
          </button>
        </div>
      </div>

      <OperatorList initialData={initialData} />
    </div>
  );
}
