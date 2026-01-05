

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProjectResumeActionsProps {
  projectId: number;
}

export default function ProjectResumeActions({
  projectId,
}: ProjectResumeActionsProps) {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">Actions sur le projet</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Button asChild variant="outline">
          <Link href={`/projects/${projectId}/lots`}>
            Lots de travaux
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`/projects/${projectId}/meetings`}>
            Piloter
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`/projects/${projectId}/teams`}>
            Affecter
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`/projects/${projectId}/map`}>
            Localiser
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`/projects/${projectId}/hours`}>
            Gérer les heures
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`/projects/${projectId}/dashboard`}>
            Tableau de bord
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`/projects/${projectId}/documents`}>
            Documentation - photos
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`/projects/${projectId}/explorer`}>
            Explorer la documentation
          </Link>
        </Button>

      </div>

      {/* Actions sensibles */}
      <div className="pt-4 border-t flex gap-2">
         <Button asChild>
        <Link href={`/projects/${projectId}/edit`}>
          Modifier le projet
        </Link>
      </Button>
        <Button variant="destructive">Supprimer</Button>
      </div>

    </div>
  );
}
