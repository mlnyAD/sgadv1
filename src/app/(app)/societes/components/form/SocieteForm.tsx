"use client";

import { useState } from "react";

export interface SocieteFormValues {
  nom: string;
  adresse1: string;
  adresse2: string;
  adresse3: string;
  ville: string;
  codePostal: string;
}

type SocieteFormChildrenProps = {
  values: SocieteFormValues;
  setValues: React.Dispatch<React.SetStateAction<SocieteFormValues>>;
};

export interface SocieteFormProps {
  initialValues: SocieteFormValues;
  onSubmit: (values: SocieteFormValues) => Promise<void>;
  onCancel: () => void;
  saving?: boolean;
  children: (props: SocieteFormChildrenProps) => React.ReactNode;
}

export function SocieteForm({
  initialValues,
  onSubmit,
  children,
}: SocieteFormProps) {
  const [values, setValues] = useState<SocieteFormValues>(initialValues);

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
