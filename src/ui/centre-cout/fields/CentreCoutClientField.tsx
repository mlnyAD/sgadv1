

interface ClientOption {
  id: string; // UUID
  nom: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  clients: ClientOption[];
  error?: string | null;
}

export function CentreCoutClientField({
  value,
  onChange,
  clients,
  error,
}: Props) {

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Client
      </label>

      <div className="md:col-span-5">
        <select
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— Sélectionner un client —</option>

          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.nom}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
