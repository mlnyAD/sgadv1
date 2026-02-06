
// src/ui/operateur/edit/OperateurFormFields.tsx
"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { OperateurFormValues } from "@/ui/operateur/operateur-form.types";
import type { OperateurFormErrors } from "@/ui/operateur/edit/OperateurForm.props";
import type { OperateurView } from "@/domain/operateur/operateur-types";

import { OperateurNomField } from "@/ui/operateur/fields/OperateurNomField";
import { OperateurPrenomField } from "@/ui/operateur/fields/OperateurPrenomField";
import { OperateurIsAdminSysField } from "@/ui/operateur/fields/OperateurIsAdminSysField";
import { OperateurEmailField } from "@/ui/operateur/fields/OperateurEmailField";
import { OperateurActifField } from "@/ui/operateur/fields/OperateurActifField";

/* ------------------------------------------------------------------ */
/* Validation schemas                                                  */
/* ------------------------------------------------------------------ */

const nomSchema = z.string().trim().min(2, "Le nom de l'opérateur doit comporter au moins 2 caractères").max(255);
const prenomSchema = z.string().trim().min(2, "Le prénom de l'opérateur doit comporter au moins 2 caractères").max(255);
const emailSchema = z.string().trim().email("Adresse email invalide");
const isAdminSysSchema = z.boolean();
const actifSchema = z.boolean();

/* ------------------------------------------------------------------ */
/* Utils                                                               */
/* ------------------------------------------------------------------ */

function getFieldError(
  value: unknown,
  schema: z.ZodTypeAny,
  serverError?: string | null
): string | null {
  const parsed = schema.safeParse(value);
  if (!parsed.success) return parsed.error.issues[0].message;
  return serverError ?? null;
}

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */

interface Props {
  initialOperateur: OperateurView | null;
  errors: OperateurFormErrors;
  onChange?: (data: OperateurFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function OperateurFormFields({ initialOperateur, errors, onChange }: Props) {
  // state
  const [nom, setNom] = useState(initialOperateur?.nom ?? "");
  const [prenom, setPrenom] = useState(initialOperateur?.prenom ?? "");
  const [email, setEmail] = useState(initialOperateur?.email ?? "");
  const [isAdminSys, setIsAdminSys] = useState<boolean>(initialOperateur?.isAdminSys ?? false);
  const [actif, setActif] = useState<boolean>(initialOperateur?.actif ?? true);

  // IMPORTANT: ce champ existe dans OperateurFormValues
  // - en création: on force true (onboarding Solution A)
  // - en édition: on reprend la valeur existante (mais en pratique, vous pouvez choisir de ne pas l’exposer en UI)
  const [mustChangePassword] = useState<boolean>(initialOperateur?.mustChangePassword ?? true);

  // validation (local + server)
  const nomError = getFieldError(nom, nomSchema, errors?.fields?.nom);
  const prenomError = getFieldError(prenom, prenomSchema, errors?.fields?.prenom);
  const emailError = getFieldError(email, emailSchema, errors?.fields?.email);
  const isAdminSysError = getFieldError(isAdminSys, isAdminSysSchema, errors?.fields?.isAdminSys ?? null);
  const actifError = getFieldError(actif, actifSchema, errors?.fields?.actif ?? null);

  // propagation
  useEffect(() => {
    onChange?.({
      id: initialOperateur?.id ?? "",
      nom,
      prenom,
      email,
      isAdminSys,
      actif,
      mustChangePassword,
    });
  }, [initialOperateur?.id, nom, prenom, email, isAdminSys, actif, mustChangePassword, onChange]);

  return (
    <>
      <OperateurNomField value={nom} onChange={setNom} error={nomError} />
      <OperateurPrenomField value={prenom} onChange={setPrenom} error={prenomError} />
      <OperateurEmailField value={email} onChange={setEmail} error={emailError} />
      <OperateurIsAdminSysField value={isAdminSys} onChange={setIsAdminSys} error={isAdminSysError} />
      <OperateurActifField value={actif} onChange={setActif} error={actifError} />

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