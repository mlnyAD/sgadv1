

"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import type { FiscView } from "@/domain/fisc/fisc-types";
import type { FiscFormValues } from "@/ui/fisc/fisc-form.types";
import type { FiscFormErrors } from "@/ui/fisc/edit/FiscForm.props";

import { FISC_TYPES } from "@/domain/fisc/fisc-types.catalog";

import { FiscTypeField } from "@/ui/fisc/fields/FiscTypeField";
import { FiscMontantField } from "@/ui/fisc/fields/FiscMontantField";
import { FiscDateField } from "@/ui/fisc/fields/FiscDateField";
import { FiscCommentairesField } from "@/ui/fisc/fields/FiscCommentairesField";
import { FiscExerciceField } from "@/ui/fisc/fields/FiscExerciceField";

/* ------------------------------------------------------------------ */
/* Validation schemas                                                  */
/* ------------------------------------------------------------------ */

const dateSchema = z
  .string()
  .min(1, "Champ requis")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu : YYYY-MM-DD");

const typeSchema = z.number().int().min(1, "Champ requis");
const montantSchema = z.coerce.number().finite().min(0, "Montant invalide");
const exerciceSchema = z.string().min(1, "Champ requis");
const commentairesSchema = z.string().trim().optional().nullable();

function getFieldError(
  value: unknown,
  schema: z.ZodTypeAny,
  serverError?: string | null
): string | null {
  const parsed = schema.safeParse(value);
  if (!parsed.success) return parsed.error.issues[0].message;
  return serverError ?? null;
}

interface Props {
  initialFisc: FiscView | null;
  errors: FiscFormErrors;
  onChange?: (data: FiscFormValues) => void;
  exercicesOptions: { value: string; label: string }[];
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function FiscFormFields({ initialFisc, errors, onChange, exercicesOptions }: Props) {

  const [exerciceId, setExerciceId] = useState<string>(initialFisc?.exerciceId ?? "");
  const [typeId, setTypeId] = useState<number>(initialFisc?.typeId ?? 1);
  const [montant, setMontant] = useState<number>(initialFisc?.montant ?? 0);
  const [date, setDate] = useState<string>(initialFisc?.date ?? "");
  const [commentaires, setCommentaires] = useState<string>(initialFisc?.commentaires ?? "");

  // options type
  const typeOptions = useMemo(
    () => FISC_TYPES.map((t) => ({ value: String(t.id), label: t.libelle })),
    []
  );

  /* -------------------- Errors -------------------- */

  const exerciceError = getFieldError(exerciceId, exerciceSchema, errors?.fields?.exerciceId);
  const typeError = getFieldError(typeId, typeSchema, errors?.fields?.typeId);
  const montantError = getFieldError(montant, montantSchema, errors?.fields?.montant);
  const dateError = getFieldError(date, dateSchema, errors?.fields?.date);
  const commentairesError = getFieldError(commentaires, commentairesSchema, errors?.fields?.commentaires);

  /* -------------------- Propagation -------------------- */

  useEffect(() => {
    onChange?.({
      exerciceId,
      typeId,
      montant,
      date,
      commentaires: commentaires ? commentaires : null,
    });
  }, [ exerciceId, typeId, montant, date, commentaires, onChange]);

  /* -------------------- Render -------------------- */

  return (
    <>
      <FiscExerciceField
        value={exerciceId}
        onChange={setExerciceId}
        error={exerciceError}
        options={exercicesOptions}   // ✅ actifs only
      />

      <FiscTypeField
        value={String(typeId)}
        onChange={(v) => setTypeId(Number(v))}
        error={typeError}
        options={typeOptions}
      />

      <FiscMontantField
        value={montant}
        onChange={setMontant}
        error={montantError}
      />

      <FiscDateField
        value={date}
        onChange={setDate}
        error={dateError}
      />

      <FiscCommentairesField
        value={commentaires}
        onChange={setCommentaires}
        error={commentairesError}
      />

      {errors.global?.length ? (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <ul className="list-disc pl-5">
            {errors.global.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}