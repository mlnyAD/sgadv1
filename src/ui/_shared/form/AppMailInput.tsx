

import { AppInput } from "./AppInput";

interface AppMailInputProps {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  placeholder?: string;
}

export function AppMailInput({
  value,
  onChange,
  invalid,
  placeholder,
}: AppMailInputProps) {
  return (
    <AppInput
      type="email"
      value={value}
      placeholder={placeholder}
      invalid={invalid}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}