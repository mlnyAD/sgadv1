

import Link from "next/link";
import { TableHeader } from "@/components/transaction/TableHeader";
import { Button } from "@/components/ui/button";

export function ProjectListToolbar() {
  return (
    <div className="mb-4">
      <div className="flex items-end justify-between gap-4">
        {/* Titre + sous-titre */}
        <div>
          <TableHeader
            title="Projets"
            subtitle="Liste des projets en cours et archivés"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button asChild variant="axcio">
            <Link href="/projects/create">
              Nouveau projet
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/dashboard">
              Annuler
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
