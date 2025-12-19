"use client";

import { Input } from "@/components/ui/input";
import { OperatorFieldProps } from "../../types";
import { validateOperatorEmail } from "./operatorEmail.schema";
import { useState } from "react";

export function OperatorEmailField({
  value,
  onChange,
  error,
  disabled,
}: OperatorFieldProps<string>) {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleBlur = () => {
    const validationError = validateOperatorEmail(value);
    setLocalError(validationError);
  };

  const displayError = error || localError;

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Email</label>

      <div className="md:col-span-5">
        <Input
          type="email"
          value={value}
          disabled={disabled}
          placeholder="email@exemple.com"
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {displayError && (
        <p className="md:col-span-3 md:col-start-2 text-sm text-red-600">
          {displayError}
        </p>
      )}
    </div>
  );
}
