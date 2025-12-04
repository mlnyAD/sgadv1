"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteConfigAction } from "./server-actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CancelButton } from "@/components/Buttons/CancelButton";
import { DeleteButton } from "@/components/Buttons/DeleteButton";

export default function DeleteConfigPage({
  data,
}: {
  data: { configId: number; configNom: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteConfigAction(data.configId);
    router.push("/configs"); // Retour vers la liste
  }

  return (
    <Card className="max-w-lg mx-auto p-6 mt-10">
      <CardHeader>
        <CardTitle className="text-xl">Supprimer la configuration</CardTitle>
      </CardHeader>

      <CardContent>
        <p>
          Confirmez-vous la suppression de :
          <br />
          <strong className="text-red-600">{data.configNom}</strong> ?
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <CancelButton
          label="Annuler"
          onClick={() => router.push("/configs")}
          disabled={loading}
        />

        <DeleteButton
          label="Confirmer"
          loading={loading}
          onClick={handleDelete}
        />
      </CardFooter>
    </Card>
  );
}
