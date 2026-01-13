

"use client";

import { useRouter } from "next/navigation";
import type { Row } from "@tanstack/react-table";
import type { LotTravView } from "@/domain/lottrav/lottrav-view.interface";

export function LotTravEditAction({
  projectId,
  row,
}: {
  projectId: string;
  row: Row<LotTravView>;
}) {
  const router = useRouter();
  const lot = row.original;

  return (
    <button
      type="button"
      className="text-blue-600 underline"
      onClick={() => router.push(`/projects/${projectId}/lots/${lot.id}`)}
    >
      Éditer
    </button>
  );
}
