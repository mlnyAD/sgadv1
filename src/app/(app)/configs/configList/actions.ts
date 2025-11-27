"use server";

import { deleteConfig } from "@/lib/config/config.service";
import { revalidatePath } from "next/cache";

export async function deleteFromListAction(id: number) {
  const { error } = await deleteConfig(id);

  if (error) {
    return { success: false, error: "Erreur lors de la suppression" };
  }

  revalidatePath("/configs");
  return { success: true };
}
