

"use client";

import { Switch } from "@/components/ui/switch";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string | null;
}

export function OperateurIsAdminSysField({
  value,
  onChange,
  error,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-2 text-sm font-medium">
        Administrateur système
      </label>

      <div className="md:col-span-4 flex items-center gap-3">
        <Switch
          checked={value}
          onCheckedChange={onChange}
        />

        <span className="text-sm text-muted-foreground">
          {value ? "Oui" : "Non"}
        </span>
      </div>

      {error && (
        <p className="md:col-span-6 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
