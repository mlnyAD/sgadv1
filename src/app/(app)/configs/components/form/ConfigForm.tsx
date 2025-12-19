"use client";

import { useState } from "react";
import { ConfigType, ConfigTypeId } from "@/shared/enums/config-type";

export interface ConfigFormValues {
  label: string;
  config_type_id: ConfigTypeId | null;
}

type ConfigFormChildrenProps = {
  values: ConfigFormValues;
  setValues: React.Dispatch<React.SetStateAction<ConfigFormValues>>;
};

export interface ConfigFormProps {
  initialValues: ConfigFormValues;
  onSubmit: (values: ConfigFormValues) => Promise<void>;
  onCancel: () => void;
  saving?: boolean;
  children: (props: ConfigFormChildrenProps) => React.ReactNode;
}

export function ConfigForm({
  initialValues,
  onSubmit,
  onCancel,
  saving,
  children,
}: ConfigFormProps) {
  const [values, setValues] = useState<ConfigFormValues>(initialValues);

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
