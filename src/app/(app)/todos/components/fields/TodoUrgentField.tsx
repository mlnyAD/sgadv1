"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TodoUrgentFieldProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export function TodoUrgentField({
  value,
  onChange,
  disabled,
}: TodoUrgentFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Urgent?</label>

      <div className="md:col-span-5">
        <RadioGroup
          value={value ? "urgent" : "normal"}
          onValueChange={(v) => onChange(v === "urgent")}
          disabled={disabled}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="urgent" id="urgent-yes" />
            <Label htmlFor="urgent-yes">Urgent</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="normal" id="urgent-no" />
            <Label htmlFor="urgent-no">Normal</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

