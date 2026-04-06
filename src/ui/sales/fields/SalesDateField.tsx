

import { FormRow } from "@/ui/_shared/form/FormRow";
import { AppDateInput } from "@/ui/_shared/form/AppDateInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function SalesDateField({ value, onChange, error }: Props) {
  return (
    <FormRow label="Date facture" error={error}>
      <AppDateInput
        value={value}
        onChange={onChange}
        invalid={!!error}
      />
    </FormRow>
  );
}