import { z } from "zod";

export const operatorRoleSchema = z
  .string()
  .min(1, "Le rôle est requis");

export const validateOperatorRole = (value: string): string | null => {
  const r = operatorRoleSchema.safeParse(value);
  return r.success ? null : r.error.issues[0].message;
};
