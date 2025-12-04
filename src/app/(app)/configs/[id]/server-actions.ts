"use server";

import { upsertConfig } from "@/lib/config/config.service";

export async function saveConfigAction(data: {
  id: number;
  name: string;
  typeId: number;
}) {
  const isCreate = data.id === 0;

  const { error } = await upsertConfig({
    id: data.id,
    name: data.name,
    typeId: data.typeId,
  });

  if (error) {
    console.error("Erreur saveConfigAction :", error);
    return { success: false, error: "Erreur lors de l'enregistrement." };
  }

  return { success: true, created: isCreate };
}
