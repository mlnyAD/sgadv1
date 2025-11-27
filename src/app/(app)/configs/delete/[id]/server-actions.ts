"use server";

import { deleteConfig } from "@/lib/config/config.service";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteConfigAction(id: number) {
  const { error } = await deleteConfig(id);

  if (error) {
    console.error("Erreur deleteConfigAction:", error);
    // On revient quand même à la liste, tu pourras améliorer l'UX plus tard
    revalidatePath("/configs");
    redirect("/configs");
  }

  revalidatePath("/configs");
  redirect("/configs");
}
