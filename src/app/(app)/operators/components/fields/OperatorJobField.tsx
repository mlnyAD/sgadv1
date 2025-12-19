"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OperatorJobFieldProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

/**
 * Options métiers
 * (à terme : à charger dynamiquement si besoin)
 */
const JOB_OPTIONS: Array<{ id: number; label: string }> = [
  { id: 1, label: "Chef de projet" },
  { id: 2, label: "Développeur" },
  { id: 3, label: "Consultant" },
  { id: 4, label: "Support" },
];

export function OperatorJobField({
  value,
  onChange,
}: OperatorJobFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Métier</label>

      <div className="md:col-span-5">
        <Select
          value={value !== null ? String(value) : undefined}
          onValueChange={(v) => onChange(v ? Number(v) : null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un métier" />
          </SelectTrigger>

          <SelectContent>
            {JOB_OPTIONS.map((job) => (
              <SelectItem key={job.id} value={String(job.id)}>
                {job.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

