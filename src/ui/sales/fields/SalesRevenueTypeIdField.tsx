

import { REVENUE_TYPES, type RevenueTypeId } from "@/domain/revenus/revenue-types.catalog";
import { FormRow } from "@/ui/_shared/form/FormRow";
import { AppCatalogSelect } from "@/ui/_shared/form/AppCatalogSelect";

interface Props {
  value: RevenueTypeId;
  onChange: (value: RevenueTypeId) => void;
  error?: string | null;
}

export function SalesRevenueTypeIdField({
  value,
  onChange,
  error,
}: Props) {
  return (
    <FormRow label="Compte" error={error}>
      <AppCatalogSelect
        value={value}
        onChange={(value) => onChange(value as RevenueTypeId)}
        options={REVENUE_TYPES.map((famille) => ({
          value: famille.id,
          label: famille.libelle,
        }))}
        invalid={!!error}
        placeholder="— Sélectionner un type de revenu —"
      />
    </FormRow>
  );
}