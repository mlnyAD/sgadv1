"use server";

import { createOperatorByAdmin } from "@/domain/operator/operator.repository";
import { CreateOperatorByAdminInput } from "@/domain/operator/operator.dto";
import { redirect } from "next/navigation";

export async function createOperatorAction(
  input: CreateOperatorByAdminInput
) {
  await createOperatorByAdmin(input);
  redirect("/operators");
}
