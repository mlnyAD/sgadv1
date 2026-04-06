

"use client";

import { Switch } from "@/components/ui/switch";

interface AppSwitchControlProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  trueLabel?: string;
  falseLabel?: string;
}

export function AppSwitchControl({
  checked,
  onChange,
  trueLabel = "Oui",
  falseLabel = "Non",
}: AppSwitchControlProps) {
  return (
    <div className="flex items-center gap-3 h-9">
      <Switch checked={checked} onCheckedChange={onChange} />
      <span className="text-sm text-muted-foreground">
        {checked ? trueLabel : falseLabel}
      </span>
    </div>
  );
}