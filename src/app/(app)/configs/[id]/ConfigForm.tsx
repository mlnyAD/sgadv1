"use client";

import { useState } from "react";
import { z } from "zod";
import { ConfigType } from "@/utils/types";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

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

// ---------------------------
// Validation Zod
// ---------------------------
const schema = z.object({
  name: z.string().min(2, "Nom invalide"),
  typeNom: z.string(),
  typeId: z.number().min(1, "Sélection du type obligatoire"),
});

// ---------------------------
// Composant principal
// ---------------------------
export default function ConfigForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData: ConfigType | null;
}) {
  const router = useRouter();

  const [name, setName] = useState(initialData?.confignom ?? "");
  const [typeNom, setTypeNom] = useState(initialData?.configtypenom ?? "");
  const [typeId, setTypeId] = useState(initialData?.configtype ?? 0);
  const [errors, setErrors] = useState<{ name?: string; type?: string }>({});

async function handleSubmit() {
  const validation = schema.safeParse({ name, typeNom, typeId });

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

  setErrors({}); // reset errors

  const result = await saveConfigAction({
    id: initialData?.configid ?? 0,
    name,
    typeId,
    typeNom,
  });

  if (!result.success) {
    toast.error(result.error ?? "Erreur lors de l’enregistrement");
    return;
  }

  toast.success(mode === "create" ? "Configuration créée" : "Configuration mise à jour");

  redirect("/configs");
}
  return (
    <Card className="bg-inherit dark:bg-inherit max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-ad-dark text-2xl">
          {mode === "create"
            ? "Création d’une configuration"
            : `Modification : ${initialData?.confignom}`}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
<ConfigNameField
  value={name}
  onChange={(v) => {
    setName(v);
    setErrors((e) => ({ ...e, name: undefined }));
  }}
  error={errors.name}
/>

<ConfigTypeField
  typeId={typeId}
  value={typeNom}
  onChange={(nom, id) => {
    setTypeNom(nom);
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
