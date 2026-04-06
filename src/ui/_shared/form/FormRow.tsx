

import type { ReactNode } from "react";

interface FormRowProps {
  label: string;
  error?: string | null;
  children: ReactNode;
}

export function FormRow({ label, error, children }: FormRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        {label}
      </label>

      <div className="md:col-span-5">
        {children}
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
    </div>
  );
}