import { z } from "zod";

export const operatorFirstNameSchema = z
  .string()
  .min(1, "Le prénom est requis")
  .min(2, "Le prénom doit comporter au moins 2 caractères");

export const validateOperatorFirstName = (value: string): string | null => {
  const r = operatorFirstNameSchema.safeParse(value);
  return r.success ? null : r.error.issues[0].message;
};
