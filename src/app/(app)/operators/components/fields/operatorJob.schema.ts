import { z } from "zod";

export const operatorJobSchema = z
  .string()
  .max(100, "Le métier ne doit pas dépasser 100 caractères")
  .optional();

export const validateOperatorJob = (value?: string): string | null => {
  if (!value) return null;
  const r = operatorJobSchema.safeParse(value);
  return r.success ? null : r.error.issues[0].message;
};
