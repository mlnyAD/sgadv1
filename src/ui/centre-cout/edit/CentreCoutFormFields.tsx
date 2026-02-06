

"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { CentreCoutFormValues } from "@/ui/centre-cout/centre-cout-form.types";
import type { CentreCoutFormErrors } from "@/ui/centre-cout/edit/CentreCoutForm.props";
import type { CentreCoutView } from "@/domain/centre-cout/centre-cout-types";
import type { CentreCoutFamilleId } from "@/domain/centre-cout/centre-cout-familles.catalog";

import { CentreCoutCodeField } from "@/ui/centre-cout/fields/CentreCoutCodeField";
import { CentreCoutLibelleField } from "@/ui/centre-cout/fields/CentreCoutLibelleField";
import { CentreCoutClientField } from "@/ui/centre-cout/fields/CentreCoutClientField";
import { CentreCoutFamilleField } from "@/ui/centre-cout/fields/CentreCoutFamilleField";
import { CentreCoutCommentairesField } from "@/ui/centre-cout/fields/CentreCoutCommentairesField";
import { CentreCoutActifField } from "@/ui/centre-cout/fields/CentreCoutActifField";

/* ------------------------------------------------------------------ */
/* Types locaux                                                        */
/* ------------------------------------------------------------------ */

interface ClientOption {
  id: string;
  nom: string;
}

/* ------------------------------------------------------------------ */
/* Validation schemas                                                  */
/* ------------------------------------------------------------------ */

const codeSchema = z
  .string()
  .trim()
  .min(1, "Le code est obligatoire")
  .max(50, "Le code est trop long");

const libelleSchema = z
  .string()
  .trim()
  .min(2, "Le libellé doit comporter au moins 2 caractères")
  .max(255, "Le libellé est trop long");

const clientIdSchema = z
  .string()
  .min(1, "Le client est obligatoire");

const familleIdSchema = z
  .number()
  .refine((v) => v > 0, "La famille est obligatoire");

const commentairesSchema = z.string().trim().optional();

const actifSchema = z.boolean();

/* ------------------------------------------------------------------ */
/* Utils                                                               */
/* ------------------------------------------------------------------ */

function getFieldError(
  value: unknown,
  schema: z.ZodTypeAny,
  serverError?: string
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
  initialCentreCout: CentreCoutView | null;
  clients: ClientOption[];
  errors: CentreCoutFormErrors;
  onChange?: (data: CentreCoutFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function CentreCoutFormFields({
  initialCentreCout,
  clients,
  errors,
  onChange,
}: Props) {

    /*console.log("[CentreCoutFormFields] RENDER", {
    initialCentreCout,
    clientsCount: clients?.length,
    hasOnChange: typeof onChange === "function",
  });*/
  /* -------------------- State values -------------------- */

  const [code, setCode] = useState(initialCentreCout?.code ?? "");
  const [libelle, setLibelle] = useState(initialCentreCout?.libelle ?? "");
  const [clientId, setClientId] = useState<string>(
    initialCentreCout?.clientId ?? ""
  );
  const [familleId, setFamilleId] = useState<number>(
    initialCentreCout?.familleId ?? 0
  );
  const [commentaires, setCommentaires] = useState(
    initialCentreCout?.commentaires ?? ""
  );
  const [actif, setActif] = useState<boolean>(
    initialCentreCout?.actif ?? true
  );

  /* -------------------- Errors (local + server) -------------------- */

  const codeError = getFieldError(code, codeSchema, errors?.fields?.code);
  const libelleError = getFieldError(
    libelle,
    libelleSchema,
    errors?.fields?.libelle
  );
  const clientError = getFieldError(
    clientId,
    clientIdSchema,
    errors?.fields?.clientId
  );
  const familleError = getFieldError(
    familleId,
    familleIdSchema,
    errors?.fields?.familleId
  );
  const commentairesError = getFieldError(
    commentaires,
    commentairesSchema,
    errors?.fields?.commentaires
  );
  const actifError = getFieldError(
    actif,
    actifSchema,
    errors?.fields?.actif
  );

  /* -------------------- Propagation -------------------- */

  /*console.log("[CentreCoutFormFields] STATE SNAPSHOT", {
  code,
  libelle,
  clientId,
  familleId,
  commentaires,
  actif,
});*/

  useEffect(() => {

  /*console.log("[CentreCoutFormFields] onChange payload", {
    code,
    libelle,
    clientId,
    familleId,
    commentaires,
    actif,
    types: {
      clientId: typeof clientId,
      familleId: typeof familleId,
    },
  });*/

    onChange?.({
      code,
      libelle,
      clientId,
      familleId,
      commentaires,
      actif,
    });
  }, [code, libelle, clientId, familleId, commentaires, actif, onChange]);

  /* -------------------- Render -------------------- */

  return (
    <>
      <CentreCoutCodeField
        value={code}
        onChange={setCode}
        error={codeError}
      />

      <CentreCoutLibelleField
        value={libelle}
        onChange={setLibelle}
        error={libelleError}
      />

      <CentreCoutClientField
        value={clientId}
        onChange={setClientId}
        clients={clients}
        error={clientError}
      />

      <CentreCoutFamilleField
        value={familleId as CentreCoutFamilleId}
        onChange={setFamilleId}
        error={familleError}
      />

      <CentreCoutCommentairesField
        value={commentaires}
        onChange={setCommentaires}
        error={commentairesError}
      />

      <CentreCoutActifField
        value={actif}
        onChange={setActif}
        error={actifError}
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
