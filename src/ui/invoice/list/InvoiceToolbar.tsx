

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableHeader } from "@/components/transaction/TableHeader";

interface Props {
  title: string;
  subtitle: string;

  // Si tu veux garder 2 boutons, tu peux passer les 2 href
  salesCreateHref?: string;
  purchaseCreateHref?: string;

  // Variante: si tu ne veux qu’un bouton unique
  createHref?: string;
  createLabel?: string;
}

export function InvoiceToolbar({
  title,
  subtitle,
  salesCreateHref,
  purchaseCreateHref,
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

        {/* Mode "1 bouton" */}
        {createHref ? (
          <Button asChild variant="axcio">
            <Link href={createHref}>{createLabel ?? "Créer"}</Link>
          </Button>
        ) : null}

        {/* Mode "2 boutons" (si createHref non fourni) */}
        {!createHref && salesCreateHref ? (
          <Button asChild variant="outline">
            <Link href={salesCreateHref}>Nouvelle vente</Link>
          </Button>
        ) : null}

        {!createHref && purchaseCreateHref ? (
          <Button asChild variant="axcio">
            <Link href={purchaseCreateHref}>Nouvel achat</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}