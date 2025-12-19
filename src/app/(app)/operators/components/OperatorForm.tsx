"use client";

import { useState } from "react";
import { OperatorFormValues } from "../types";
import { OperatorFormCard } from "./OperatorFormCard";

type OperatorFormChildrenProps = {
  values: OperatorFormValues;
  setValues: React.Dispatch<React.SetStateAction<OperatorFormValues>>;
};

export interface OperatorFormProps {
  initialValues: OperatorFormValues;
  onSubmit: (values: OperatorFormValues) => Promise<void>;
  onCancel: () => void;
  saving?: boolean;
  children: (props: OperatorFormChildrenProps) => React.ReactNode;
}

export function OperatorForm({
  initialValues,
  onSubmit,
  onCancel,
  saving,
  children,
}: OperatorFormProps) {
  const [values, setValues] = useState<OperatorFormValues>(initialValues);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      <OperatorFormCard onCancel={onCancel} saving={saving}>
        {children({ values, setValues })}
      </OperatorFormCard>
    </form>
  );
}
