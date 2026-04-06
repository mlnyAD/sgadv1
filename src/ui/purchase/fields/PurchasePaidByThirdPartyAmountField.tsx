

import { FormRow } from "@/ui/_shared/form/FormRow";
import { AppDecimalInput } from "@/ui/_shared/form/AppDecimalInput";

interface Props {
  value: number;
  onChange: (value: number) => void;
  error?: string | null;
}

export function PurchasePaidByThirdPartyAmountField({value, onChange, error, }: Props) {
  
  return (
    <FormRow label="Payé par un tiers (TTC)" error={error}>
      <AppDecimalInput
        value={value}
        onChange={onChange}
        invalid={!!error}
      />
    </FormRow>
  );
}