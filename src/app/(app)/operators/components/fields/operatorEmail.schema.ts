import { z } from "zod";

export const operatorEmailSchema = z
  .string()
  .min(1, "L’email est requis")
  .email("Format d’email invalide");

export const validateOperatorEmail = (value: string): string | null => {
  const result = operatorEmailSchema.safeParse(value);
  return result.success ? null : result.error.issues[0].message;
};
