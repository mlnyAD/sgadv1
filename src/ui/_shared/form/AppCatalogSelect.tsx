

import { formControlClassName } from "./formFieldStyles";

export interface CatalogSelectOption {
  value: number;
  label: string;
}

interface AppCatalogSelectProps {
  value: number | null | undefined;
  onChange: (value: number) => void;
  options: CatalogSelectOption[];
  invalid?: boolean;
  placeholder?: string;
}

export function AppCatalogSelect({
  value,
  onChange,
  options,
  invalid,
  placeholder = "— Sélectionner —",
}: AppCatalogSelectProps) {
  return (
    <select
      className={`${formControlClassName} ${invalid ? "border-destructive" : ""}`.trim()}
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}