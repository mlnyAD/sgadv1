
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface OperatorRoleFieldProps {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
}

/**
 * Mapping DB → label UI
 * (source : USER_ROLES)
 */
const ROLE_OPTIONS: Array<{ id: number; label: string }> = [
  { id: 1, label: "Administrateur système" },
  { id: 2, label: "Administrateur client" },
  { id: 3, label: "Administrateur projet" },
  { id: 4, label: "Utilisateur" },
];

export function OperatorRoleField({
  value,
  onChange,
  disabled,
}: OperatorRoleFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Rôle</label>

      <div className="md:col-span-5">
        <Select
          value={value !== null ? value.toString() : ""}
          onValueChange={(v) => onChange(Number(v))}
          disabled={disabled}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>

          <SelectContent>
            {ROLE_OPTIONS.map((role) => (
              <SelectItem key={role.id} value={role.id.toString()}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
