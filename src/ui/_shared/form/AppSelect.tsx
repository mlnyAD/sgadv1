

import { formControlClassName } from "./formFieldStyles";

export interface SelectOption {
  value: string;
  label: string;
}

interface AppSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  invalid?: boolean;
  placeholder?: string;
}

export function AppSelect({
  value,
  onChange,
  options,
  invalid,
  placeholder = "— Sélectionner —",
}: AppSelectProps) {
  return (
    <select
      className={`${formControlClassName} ${invalid ? "border-destructive" : ""}`.trim()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}