

import { FormRow } from "@/ui/_shared/form/FormRow";
import { AppSelect, type SelectOption } from "@/ui/_shared/form/AppSelect";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  options: SelectOption[];
}

export function PurchaseExerciceField({ value, onChange, error, options }: Props) {
  return (
    <FormRow label="Exercice" error={error}>
      <AppSelect
        value={value}
        onChange={onChange}
        options={options}
        invalid={!!error}
      />
    </FormRow>
  );
}