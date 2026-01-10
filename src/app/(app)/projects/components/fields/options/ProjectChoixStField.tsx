

"use client";

import { Switch } from "@/components/ui/switch";

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  value: boolean | null;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectChoixStField({
  value,
  onChange,
  disabled,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Choix des sous-traitants
      </label>

      <div className="md:col-span-5 flex items-center gap-3">
        <Switch
          checked={value === true}
          disabled={disabled}
          onCheckedChange={onChange}
        />

        <span className="text-sm text-muted-foreground">
          {value ? "Validé" : "Non validé"}
        </span>
      </div>
    </div>
  );
}
