"use server";

import { updateOperator } from "@/domain/operator/operator.repository";
import { OperatorUpdateInput } from "@/domain/operator/operator.dto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateOperatorAction(
  input: OperatorUpdateInput
) {
  if (!input.id) {
    throw new Error("Identifiant opérateur manquant");
  }

  await updateOperator(input);

  revalidatePath("/operators");
  redirect("/operators");
}
