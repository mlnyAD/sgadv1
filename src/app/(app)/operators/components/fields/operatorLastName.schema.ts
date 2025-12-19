import { z } from "zod";

export const operatorLastNameSchema = z
  .string()
  .min(1, "Le nom est requis")
  .min(2, "Le nom doit comporter au moins 2 caractères");

export const validateOperatorLastName = (value: string): string | null => {
  const r = operatorLastNameSchema.safeParse(value);
  return r.success ? null : r.error.issues[0].message;
};
