

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableHeader } from "@/components/transaction/TableHeader";

interface TaskToolbarProps {
  projectId: number;
  lottravId: number;
}

export function TaskToolbar({
  projectId,
  lottravId,
}: TaskToolbarProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <TableHeader
        title="Tâches"
        subtitle="Gérer les tâches du lot de travaux"
      />

      <div className="flex items-center gap-2">
        {/* Fermer → retour à la liste des lots */}
        <Link
          href={`/projects/${projectId}/lots`}
          className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
        >
          Fermer
        </Link>

        {/* Nouvelle tâche */}
        <Button asChild variant="axcio">
          <Link
            href={`/projects/${projectId}/lots/${lottravId}/tasks/create`}
          >
            Nouvelle tâche
          </Link>
        </Button>
      </div>
    </div>
  );
}
