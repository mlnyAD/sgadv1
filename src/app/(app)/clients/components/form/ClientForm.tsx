

"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface ClientFormValues {
  nom: string;
  adresse: string | null;
  codePostal: string | null;
  ville: string | null;
  siren: string | null;
}

type ClientFormChildrenProps = {
  values: ClientFormValues;
  setValues: React.Dispatch<
    React.SetStateAction<ClientFormValues>
  >;
};

export interface ClientFormProps {
  initialValues: ClientFormValues;
  onSubmit: (values: ClientFormValues) => Promise<void>;
  onCancel: () => void;
  saving?: boolean;
  children: (props: ClientFormChildrenProps) => React.ReactNode;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function ClientForm({
  initialValues,
  onSubmit,
  children,
}: ClientFormProps) {
  const [values, setValues] =
    useState<ClientFormValues>(initialValues);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      {children({ values, setValues })}
    </form>
  );
}
