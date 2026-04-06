

"use client";

import { FormRow } from "@/ui/_shared/form/FormRow";
import { AppSwitchControl } from "@/ui/_shared/form/AppSwitchControl";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string | null;
}

export function ExerciceActifField({value, onChange, error, }: Props) {
  
  return (
    <FormRow label="Exercice actif" error={error}>
      <AppSwitchControl
        checked={value}
        onChange={onChange}
        trueLabel="Oui"
        falseLabel="Non"
      />
    </FormRow>
  );
}