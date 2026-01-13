

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableHeader } from "@/components/transaction/TableHeader";

interface LottravToolbarProps {
  projectId: number;
}

export function LottravToolbar({
  projectId,
}: LottravToolbarProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <TableHeader
        title="Lots de travaux"
        subtitle="Gérer les lots du projet"
      />

      <div className="flex items-center gap-2">
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
        >
          Fermer
        </Link>

        <Button asChild variant="axcio">
          <Link
            href={`/projects/${projectId}/lots/create`}
          >
            Nouveau lot
          </Link>
        </Button>
      </div>
    </div>
  );
}
