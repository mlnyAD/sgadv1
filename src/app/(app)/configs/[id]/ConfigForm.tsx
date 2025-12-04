// @noReactCompiler
"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { redirect } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import ConfigNameField from "./fields/ConfigNameField";
import ConfigTypeField from "./fields/ConfigTypeField";
import ConfigFormButtons from "./actions/ConfigFormButtons";

import { saveConfigAction } from "./server-actions";
import { DbConfig } from "@/domain/config/config.interface";

// -----------------------------------------------------
// Validation Zod (corrigée)
// -----------------------------------------------------
const schema = z.object({
  name: z.string().min(2, "Nom invalide"),
  typeId: z.number().min(1, "Sélection du type obligatoire"),
});

// -----------------------------------------------------
// Composant principal
// -----------------------------------------------------
export default function ConfigForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData: DbConfig | null;
}) {
  const [name, setName] = useState(initialData?.config_nom ?? "");
  const [typeId, setTypeId] = useState<number | "">(initialData?.config_type ?? "");
  const [errors, setErrors] = useState<{ name?: string; type?: string }>({});

  async function handleSubmit() {
    const validation = schema.safeParse({
      name,
      typeId: Number(typeId),
    });

    if (!validation.success) {
      const issue = validation.error.issues[0];

      if (issue.path[0] === "name") {
        setErrors({ name: issue.message });
      }

      if (issue.path[0] === "typeId") {
        setErrors({ type: issue.message });
      }

      return;
    }

    // Nettoyage des erreurs
    setErrors({});

    // Appel serveur
    const result = await saveConfigAction({
      id: initialData?.config_id ?? 0,
      name,
      typeId: Number(typeId),
    });

    if (!result.success) {
      toast.error(result.error ?? "Erreur lors de l’enregistrement");
      return;
    }

    toast.success(
      mode === "create"
        ? "Configuration créée"
        : "Configuration mise à jour"
    );

    redirect("/configs");
  }

  return (
    <Card className="bg-inherit dark:bg-inherit max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-ad-dark text-2xl">
          {mode === "create"
            ? "Création d’une configuration"
            : `Modification : ${initialData?.config_nom}`}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Champ Nom */}
        <ConfigNameField
          value={name}
          onChange={(v) => {
            setName(v);
            setErrors((e) => ({ ...e, name: undefined }));
          }}
          error={errors.name}
        />

        {/* Champ Type */}
        <ConfigTypeField
          typeId={typeId}
          onChange={(label, id) => {
            setTypeId(id);
            setErrors((e) => ({ ...e, type: undefined }));
          }}
          error={errors.type}
        />
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <ConfigFormButtons onValidate={handleSubmit} />
      </CardFooter>
    </Card>
  );
}
