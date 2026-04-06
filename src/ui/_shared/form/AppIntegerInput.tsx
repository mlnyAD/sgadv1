

import type { FocusEventHandler } from "react";
import { AppInput } from "./AppInput";

interface AppIntegerInputProps {
  value: number;
  onChange: (value: number) => void;
  invalid?: boolean;
  selectOnFocus?: boolean;
  min?: number;
  max?: number;
}

export function AppIntegerInput({
  value,
  onChange,
  invalid,
  selectOnFocus = true,
  min,
  max,
}: AppIntegerInputProps) {
  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    if (selectOnFocus) e.currentTarget.select();
  };

  return (
    <AppInput
      type="number"
      step="1"
      min={min}
      max={max}
      invalid={invalid}
      value={Number.isFinite(value) ? value : 0}
      onFocus={handleFocus}
      onChange={(e) =>
        onChange(e.target.value === "" ? 0 : Math.trunc(Number(e.target.value)))
      }
    />
  );
}