

import type { ReactNode } from "react";

interface FormRowProps {
  label: string;
  error?: string | null;
  children: ReactNode;
}

export function FormRow({ label, error, children }: FormRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-6 gap-y-3 items-center border-b border-muted pb-3">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 md:text-right">
        {label}
      </label>

      <div className="w-full min-w-0">
        {children}

        {error && (
          <p className="mt-1 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}