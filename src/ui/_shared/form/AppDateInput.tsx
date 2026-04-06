

import { AppInput } from "./AppInput";

interface AppDateInputProps {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}

export function AppDateInput({ value, onChange, invalid }: AppDateInputProps) {
  return (
    <AppInput
      type="date"
      invalid={invalid}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}