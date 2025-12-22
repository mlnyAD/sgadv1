"use client";

import Link from "next/link";
import { TableHeader } from "@/components/transaction/TableHeader";
import { Button } from "@/components/ui/button";

export function TodosToolbar() {
  return (
    <div className="mb-4">
      <div className="flex items-end justify-between gap-4">
        {/* Titre + sous-titre */}
        <div>
          <TableHeader
            title="Actions" 
            subtitle="Gérer les actions à réaliser"
          />
        </div>

        {/* Actions globales */}
        <div className="flex items-center gap-2">
          {/* Fermer */}
          <Link
            href="/dashboard"
            className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
          >
            Fermer
          </Link>

          {/* Créer */}
          <Button asChild variant="axcio">
            <Link href="/todos/create">
              Nouvelle action
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
