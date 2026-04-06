

import { AppInput } from "@/ui/_shared/form/AppInput";
import { FormRow } from "@/ui/_shared/form/FormRow";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function OperateurNomField({ value, onChange, error }: Props) {
  return (
    <FormRow label="Nom de l&apos;opérateur" error={error}>
      <AppInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        invalid={!!error}
      />
    </FormRow>
  );
}
