

import { FormRow } from "@/ui/_shared/form/FormRow";
import { AppSelect, type SelectOption } from "@/ui/_shared/form/AppSelect";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  options: SelectOption[];
}

export function SalesSocieteField({ value, onChange, error, options }: Props) {
  return (
    <FormRow label="Client" error={error}>
      <AppSelect
        value={value}
        onChange={onChange}
        options={options}
        invalid={!!error}
      />
    </FormRow>
  );
}