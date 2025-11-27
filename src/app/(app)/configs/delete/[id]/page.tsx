import Link from "next/link";
import { notFound } from "next/navigation";
import { getConfigById } from "@/lib/config/config.service";
import { deleteConfigAction } from "./server-actions";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DeleteConfigPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const configId = Number(id);

  if (isNaN(configId) || configId <= 0) notFound();

  const { data, error } = await getConfigById(configId);
  if (error || !data) notFound();

  return (
    <Card className="max-w-lg mx-auto p-6 mt-10">
      <CardHeader>
        <CardTitle className="text-xl">Supprimer la configuration</CardTitle>
      </CardHeader>

      <CardContent>
        <p>
          Confirmez-vous la suppression de :
          <br />
          <strong className="text-red-600">{data.confignom}</strong> ?
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Link href="/configs">
          <Button variant="outline" type="button">
            Annuler
          </Button>
        </Link>

        <form action={deleteConfigAction.bind(null, configId)}>
          <Button variant="destructive" type="submit">
            Confirmer la suppression
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
