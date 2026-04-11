

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableHeader } from "@/components/transaction/TableHeader";

export function CentreCoutPageHeader() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <TableHeader
        title="Centres de coût"
        subtitle="Gérer les centres de coût du site"
      />

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="inline-flex h-9 items-center rounded-md border border-muted-foreground/40 px-4 text-sm text-foreground hover:bg-muted"
        >
          Fermer
        </Link>

        <Button asChild variant="axcio">
          <Link href="/centres-cout/create">
            Nouveau centre de coût
          </Link>
        </Button>
      </div>
    </div>
  );
}