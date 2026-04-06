

import { AppMailInput } from "@/ui/_shared/form/AppMailInput";
import { FormRow } from "@/ui/_shared/form/FormRow";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function ClientEmailField({ value, onChange, error }: Props) {
  return (
    <FormRow label="Email" error={error}>
      <AppMailInput
        value={value}
        onChange={onChange}
        invalid={!!error}
      />
    </FormRow>
  );
}
