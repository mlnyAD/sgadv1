

import type { InputHTMLAttributes } from "react";
import { formControlClassName } from "./formFieldStyles";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function AppInput({
  invalid,
  className = "",
  ...props
}: AppInputProps) {
  return (
    <input
      {...props}
      className={`
        ${formControlClassName}
        ${invalid ? "border-destructive focus:ring-destructive" : ""}
        ${className}
      `.trim()}
    />
  );
}