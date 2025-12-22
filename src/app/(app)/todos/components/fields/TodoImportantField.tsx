"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TodoImportantFieldProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export function TodoImportantField({
  value,
  onChange,
  disabled,
}: TodoImportantFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Important?</label>

      <div className="md:col-span-5">
        <RadioGroup
          value={value ? "Important" : "Normal"}
          onValueChange={(v) => onChange(v === "Important")}
          disabled={disabled}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="important" id="status-important" />
            <Label htmlFor="status-important">Important</Label>
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
