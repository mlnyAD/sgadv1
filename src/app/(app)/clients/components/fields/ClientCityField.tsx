

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schemas
   ------------------------------------------------------------------ */

const codePostalSchema = z
  .string()
  .trim()
  .regex(/^\d{5}$/, "Code postal invalide");

const villeSchema = z
  .string()
  .trim()
  .min(2, "La ville doit comporter au moins 2 caractères")
  .max(255, "Nom de ville trop long");

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  codePostal: string | null;
  ville: string | null;
  onChange: (patch: {
    codePostal: string | null;
    ville: string | null;
  }) => void;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ClientCityField({
  codePostal,
  ville,
  onChange,
}: Props) {
  const [cpError, setCpError] = useState<string | null>(null);
  const [villeError, setVilleError] = useState<string | null>(null);

  function handleCodePostalChange(v: string) {
    const parsed = codePostalSchema.safeParse(v);

    if (!parsed.success) {
      setCpError(parsed.error.issues[0].message);
    } else {
      setCpError(null);
    }

    onChange({
      codePostal: v || null,
      ville,
    });
  }

  function handleVilleChange(v: string) {
    const parsed = villeSchema.safeParse(v);

    if (!parsed.success) {
      setVilleError(parsed.error.issues[0].message);
    } else {
      setVilleError(null);
    }

    onChange({
      codePostal,
      ville: v || null,
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Localisation
      </label>

      <div className="md:col-span-2">
        <input
          type="text"
          placeholder="Code postal"
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={codePostal ?? ""}
          onChange={(e) =>
            handleCodePostalChange(e.target.value)
          }
        />

        {cpError && (
          <p className="text-sm text-destructive">
            {cpError}
          </p>
        )}
      </div>

      <div className="md:col-span-3">
        <input
          type="text"
          placeholder="Ville"
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={ville ?? ""}
          onChange={(e) =>
            handleVilleChange(e.target.value)
          }
        />

        {villeError && (
          <p className="text-sm text-destructive">
            {villeError}
          </p>
        )}
      </div>
    </div>
  );
}
