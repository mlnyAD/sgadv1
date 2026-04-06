

import { AppInput } from "./AppInput";

interface AppTextInputProps {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  type?: "text" | "password" | "search" | "tel" | "url";
  placeholder?: string;
}

export function AppTextInput({
  value,
  onChange,
  invalid,
  type = "text",
  placeholder,
}: AppTextInputProps) {
  return (
    <AppInput
      type={type}
      value={value}
      placeholder={placeholder}
      invalid={invalid}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}