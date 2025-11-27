"use server";

import { upsertConfig } from "@/lib/config/config.service";

export async function saveConfigAction(data: {
  id: number;
  name: string;
  typeId: number;
  typeNom: string;
}) {
  const isCreate = data.id === 0;

  const { error } = await upsertConfig({
    id: data.id,
    name: data.name,
    typeId: data.typeId,
    typeNom: data.typeNom,
  });

  if (error) {
    console.error("Erreur saveConfigAction :", error);
    return { success: false, error: "Erreur lors de l'enregistrement." };
  }

  return { success: true, created: isCreate };
}
