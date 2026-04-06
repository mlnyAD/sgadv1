

import { FormRow } from "@/ui/_shared/form/FormRow";
import { AppDecimalInput } from "@/ui/_shared/form/AppDecimalInput";

interface Props {
  value: number;
  onChange: (value: number) => void;
  error?: string | null;
}

export function PurchaseAmountHtField({value, onChange, error, }: Props) {

  return (
    <FormRow label="Montant HT" error={error}>
      <AppDecimalInput
        value={value}
        onChange={onChange}
        invalid={!!error}
      />
    </FormRow>
  );
}