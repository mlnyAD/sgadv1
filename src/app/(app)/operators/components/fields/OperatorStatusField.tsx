"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OperatorStatusFieldProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export function OperatorStatusField({
  value,
  onChange,
  disabled,
}: OperatorStatusFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Statut</label>

      <div className="md:col-span-5">
        <RadioGroup
          value={value ? "active" : "inactive"}
          onValueChange={(v) => onChange(v === "active")}
          disabled={disabled}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="active" id="status-active" />
            <Label htmlFor="status-active">Actif</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="inactive" id="status-inactive" />
            <Label htmlFor="status-inactive">Inactif</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
