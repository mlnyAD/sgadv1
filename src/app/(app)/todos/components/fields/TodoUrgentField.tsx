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
          value={value ? "Urgent" : "Normal"}
          onValueChange={(v) => onChange(v === "Urgent")}
          disabled={disabled}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="urgent" id="status-urgent" />
            <Label htmlFor="status-urgent">Urgent</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="normal" id="status-normal" />
            <Label htmlFor="status-normal">Normal</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
