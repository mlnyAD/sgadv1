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
import { ConfigEntity } from "@/domain/config/config.repository";

interface ConfigFormProps {
  initialData: ConfigEntity | null;
  isNew: boolean;
}

// -----------------------------------------------------
// Validation Zod
// -----------------------------------------------------
const schema = z.object({
  name: z.string().min(2, "Nom invalide"),
  typeId: z.number().min(1, "Sélection du type obligatoire"),
});

// -----------------------------------------------------
// Composant principal
// -----------------------------------------------------
export default function ConfigForm({ initialData, isNew }: ConfigFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [typeId, setTypeId] = useState<number | "">(initialData?.type ?? "");
  const [errors, setErrors] = useState<{ name?: string; type?: string }>({});

  async function handleSubmit() {
    const validation = schema.safeParse({
      name,
      typeId: Number(typeId),
    });

    if (!validation.success) {
      const issue = validation.error.issues[0];

      setErrors({
        name: issue.path[0] === "name" ? issue.message : undefined,
        type: issue.path[0] === "typeId" ? issue.message : undefined,
      });

      return;
    }

    // Reset des erreurs
    setErrors({});

    // Appel serveur
    const result = await saveConfigAction({
      id: initialData?.id ?? 0,
      name,
      typeId: Number(typeId),
    });

    if (!result.success) {
      toast.error(result.error ?? "Erreur lors de l’enregistrement");
      return;
    }

    toast.success(isNew ? "Configuration créée" : "Configuration mise à jour");

    redirect("/configs");
  }

  return (
    <Card className="bg-inherit dark:bg-inherit max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-ad-dark text-2xl">
          {isNew
            ? "Création d’une configuration"
            : `Modification : ${initialData?.name}`}
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
