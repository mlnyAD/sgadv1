

"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { CompteFormValues } from "@/ui/compte/compte-form.types";
import type { CompteFormErrors } from "@/ui/compte/edit/CompteForm.props";
import type { CompteView } from "@/domain/compte/compte-types";

import { CompteNomField } from "@/ui/compte/fields/CompteNomField";
import { CompteOrdreField } from "@/ui/compte/fields/CompteOrdreField";
import { CompteActifField } from "@/ui/compte/fields/CompteActifField";
import { CompteInclusGlobalField } from "@/ui/compte/fields/CompteInclusGlobalField";

/* ------------------------------------------------------------------ */
/* Validation schemas (1 par champ)                                    */
/* ------------------------------------------------------------------ */

const nomSchema = z.string().trim().min(1, "Champ requis");

const ordreSchema = z
  .number()
  .int("Doit être un entier")
  .min(1, "Doit être >= 1");

const actifSchema = z.boolean();
const inclusGlobalSchema = z.boolean();

/* ------------------------------------------------------------------ */
/* Utils                                                               */
/* ------------------------------------------------------------------ */

function getFieldError(
  value: unknown,
  schema: z.ZodTypeAny,
  serverError?: string | null
): string | null {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    return parsed.error.issues[0].message;
  }
  return serverError ?? null;
}

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */

interface Props {
  initialCompte: CompteView | null;
  errors: CompteFormErrors;
  onChange?: (data: CompteFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function CompteFormFields({ initialCompte, errors, onChange }: Props) {
  /* -------------------- State values -------------------- */

  const [nom, setNom] = useState(initialCompte?.nom ?? "");
  const [ordre, setOrdre] = useState<number>(initialCompte?.ordre ?? 1);
  const [actif, setActif] = useState<boolean>(initialCompte?.actif ?? true);
  const [inclusGlobal, setInclusGlobal] = useState<boolean>(initialCompte?.inclusGlobal ?? true);

  /* -------------------- Errors (local + server) -------------------- */

  const nomError = getFieldError(nom, nomSchema, errors?.fields?.nom);
  const ordreError = getFieldError(ordre, ordreSchema, errors?.fields?.ordre);
  const actifError = getFieldError(actif, actifSchema, errors?.fields?.actif);
  const inclusGlobalError = getFieldError(inclusGlobal, inclusGlobalSchema, errors?.fields?.inclusGlobal);

  /* -------------------- Propagation -------------------- */

  useEffect(() => {
    onChange?.({
      nom,
      ordre,
      actif,
      inclusGlobal,
      // societeId: undefined, // on le branchera si/qd vous avez le champ
    });
  }, [nom, ordre, actif, inclusGlobal, onChange]);

  /* -------------------- Render -------------------- */

  return (
    <>
      <CompteNomField value={nom} onChange={setNom} error={nomError} />

      <CompteOrdreField value={ordre} onChange={setOrdre} error={ordreError} />

      <CompteActifField value={actif} onChange={setActif} error={actifError} />

      <CompteInclusGlobalField
        value={inclusGlobal}
        onChange={setInclusGlobal}
        error={inclusGlobalError}
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