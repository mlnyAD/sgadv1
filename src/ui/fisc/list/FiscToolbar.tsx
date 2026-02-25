

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableHeader } from "@/components/transaction/TableHeader";

export function FiscToolbar() {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <TableHeader title="Fiscalité" subtitle="Gérer les versements fiscaux" />

      <div className="flex items-center gap-2">
        <Link
          href={`/dashboard`}
          className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
        >
          Annuler
        </Link>

        <Button asChild variant="axcio">
          <Link href={`/fisc/create`}>Nouveau versement</Link>
        </Button>
      </div>
    </div>
  );
}