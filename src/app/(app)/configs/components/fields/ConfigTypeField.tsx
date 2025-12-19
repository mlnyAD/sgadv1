import { ConfigType, ConfigTypeId } from "@/shared/enums/config-type";

interface ConfigTypeFieldProps {
  value: ConfigTypeId | null;
  onChange: (value: ConfigTypeId | null) => void;
}

export function ConfigTypeField({
  value,
  onChange,
}: ConfigTypeFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Type de configuration</label>

      <div className="md:col-span-5">
        <select
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={value ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            onChange(
              v === ""
                ? null
                : (Number(v) as ConfigTypeId)
            );
          }}
        >
          <option value="">
            Sélectionner un type
          </option>

          {ConfigType.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
