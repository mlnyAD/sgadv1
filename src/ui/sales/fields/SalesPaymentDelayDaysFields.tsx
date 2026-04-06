

import { FormRow } from "@/ui/_shared/form/FormRow";
import { AppIntegerInput } from "@/ui/_shared/form/AppIntegerInput";

interface Props {
  value: number;
  onChange: (value: number) => void;
  error?: string | null;
}

export function SalesPaymentDelayDaysField({value, onChange, error, }: Props) {
  
  return (
    <FormRow label="Délai de paiement (j)" error={error}>
      <AppIntegerInput
        value={value}
        onChange={onChange}
        invalid={!!error}
      />
    </FormRow>
  );
}