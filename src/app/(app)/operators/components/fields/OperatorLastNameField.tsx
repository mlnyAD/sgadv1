"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { OperatorFieldProps } from "../../types";
import { validateOperatorLastName } from "./operatorLastName.schema";

export function OperatorLastNameField({
  value,
  onChange,
  error,
  disabled,
}: OperatorFieldProps<string>) {
  const [localError, setLocalError] = useState<string | null>(null);

  const onBlur = () => setLocalError(validateOperatorLastName(value));
  const displayError = error || localError;

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Nom</label>

      <div className="md:col-span-5">
        <Input
          value={value}
          disabled={disabled}
          placeholder="Nom"
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />

        {displayError && (
          <p className="md:col-span-3 md:col-start-2 text-sm text-red-600">
            {displayError}
          </p>
        )}
      </div>
    </div>
  );
}
