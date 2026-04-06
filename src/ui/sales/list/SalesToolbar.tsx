

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableHeader } from "@/components/transaction/TableHeader";

interface Props {
  title: string;
  subtitle: string;

  salesCreateHref?: string;

  // Variante: si tu ne veux qu’un bouton unique
  createHref?: string;
  createLabel?: string;
}

export function SalesToolbar({
  title,
  subtitle,
  salesCreateHref,
  createHref,
  createLabel,
}: Props) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <TableHeader title={title} subtitle={subtitle} />

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
        >
          Fermer
        </Link>

        {createHref ? (
          <Button asChild variant="axcio">
            <Link href={createHref}>{createLabel ?? "Créer"}</Link>
          </Button>
        ) : null}

        {!createHref && salesCreateHref ? (
          <Button asChild variant="outline">
            <Link href={salesCreateHref}>Nouvelle vente</Link>
          </Button>
        ) : null}

      </div>
    </div>
  );
}