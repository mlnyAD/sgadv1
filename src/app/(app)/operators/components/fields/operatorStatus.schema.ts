import { z } from "zod";

export const operatorStatusSchema = z
  .enum(["active", "inactive"])
  .refine(
    (value) => value === "active" || value === "inactive",
    {
      message: "Statut invalide",
    }
  );

export const validateOperatorStatus = (value: string): string | null => {
  const r = operatorStatusSchema.safeParse(value);
  return r.success ? null : r.error.issues[0].message;
};
