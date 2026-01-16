"use server";

import { deleteOperator } from "@/domain/operator/operator.repository";
import { redirect } from "next/navigation";

export async function deleteOperatorAction(
  formData: FormData
) {
  const rawId = formData.get("operatorId");

  const operatorId = Number(rawId);

  if (!rawId || Number.isNaN(operatorId)) {
    throw new Error("Invalid operator id");
  }

  await deleteOperator(operatorId);

  redirect("/operators");
}
