
/*
import type { FocusEventHandler } from "react";
import { AppInput } from "./AppInput";

interface AppDecimalInputProps {
  value: number;
  onChange: (value: number) => void;
  invalid?: boolean;
  step?: string;
  selectOnFocus?: boolean;
  min?: number;
  max?: number;
}

export function AppDecimalInput({
  value,
  onChange,
  invalid,
  step = "0.01",
  selectOnFocus = true,
  min,
  max,
}: AppDecimalInputProps) {
  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    if (selectOnFocus) e.currentTarget.select();
  };

  return (
    <AppInput
      type="number"
      step={step}
      min={min}
      max={max}
      invalid={invalid}
      value={Number.isFinite(value) ? value : 0}
      onFocus={handleFocus}
      onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
    />
  );
}
  */
 import { useEffect, useState, type FocusEventHandler } from "react";
import { AppInput } from "./AppInput";

interface AppDecimalInputProps {
  value: number;
  onChange: (value: number) => void;
  invalid?: boolean;
  selectOnFocus?: boolean;
  placeholder?: string;
}

export function AppDecimalInput({
  value,
  onChange,
  invalid,
  selectOnFocus = true,
  placeholder,
}: AppDecimalInputProps) {
  const [textValue, setTextValue] = useState(String(Number.isFinite(value) ? value : 0));

  useEffect(() => {
    setTextValue(String(Number.isFinite(value) ? value : 0));
  }, [value]);

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    if (selectOnFocus) e.currentTarget.select();
  };

  return (
    <AppInput
      type="text"
      inputMode="decimal"
      invalid={invalid}
      value={textValue}
      placeholder={placeholder}
      onFocus={handleFocus}
      onChange={(e) => {
        const raw = e.target.value;
        setTextValue(raw);

        const normalized = raw.replace(",", ".").trim();

        if (normalized === "") {
          onChange(0);
          return;
        }

        const parsed = Number(normalized);
        if (!Number.isNaN(parsed)) {
          onChange(parsed);
        }
      }}
    />
  );
}