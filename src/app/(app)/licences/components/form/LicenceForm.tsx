"use client";

import { useState } from "react";
import type { LicenceFormValues } from "@/domain/licence/licence.form.types";

export type LicenceFormRenderProps = {
  values: LicenceFormValues;
  setValues: React.Dispatch<
    React.SetStateAction<LicenceFormValues>
  >;
};

export interface LicenceFormProps {
  initialValues: LicenceFormValues;
  onSubmit: (values: LicenceFormValues) => Promise<void>;
  children: (props: LicenceFormRenderProps) => React.ReactNode;
}

export function LicenceForm({
  initialValues,
  onSubmit,
  children,
}: LicenceFormProps) {
  const [values, setValues] =
    useState<LicenceFormValues>(initialValues);

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
