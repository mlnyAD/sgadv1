import { TODO_ETAT_CATALOG, TodoEtatId } from "@/domain/todo/todo-etat.catalog";

interface TodoEtatFieldProps {
  value: TodoEtatId | null
  onChange: (value: TodoEtatId | null) => void
}

export function TodoEtatField({
  value,
  onChange,
}: TodoEtatFieldProps) {
  return (
	<div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
	  <label className="md:col-span-1 text-sm font-medium">Etat de l&apos;action</label>

	  <div className="md:col-span-5">
		<select
		  className="h-9 w-full rounded-md border px-3 text-sm"
		  value={value ?? ""}
		  onChange={(e) => {
			const v = e.target.value;
			onChange(
			  v === ""
				? null
				: (Number(v) as TodoEtatId)
			);
		  }}
		>
		  <option value="">
			Sélectionner un état
		  </option>

		  {TODO_ETAT_CATALOG.map((type) => (
			<option key={type.id} value={type.id}>
			  {type.label}
			</option>
		  ))}
		</select>
	  </div>
	</div>
  );
}
