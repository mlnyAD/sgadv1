"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TODO_ETAT_CATALOG } from "@/domain/todo/todo.catalog";


export type TodosFiltersValues = {
  search: string;
  urgent?: boolean;
  important?: boolean;
  etatId?: number;
};

interface TodosFiltersProps {
  value: TodosFiltersValues;
  onChange: (next: TodosFiltersValues) => void;
}

export function TodosFilters({ value, onChange }: TodosFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 border rounded-md bg-muted/30">
      {/* 🔍 Recherche */}
      <div className="flex items-center gap-2 min-w-[260px] h-9">
        <Label htmlFor="search" className="whitespace-nowrap">
          Recherche
        </Label>
        <Input
          id="search"
          className="h-9"
          placeholder="Titre…"
          value={value.search}
          onChange={(e) =>
            onChange({ ...value, search: e.target.value })
          }
        />
      </div>

      {/* ⚠️ Urgent */}
      <div className="flex items-center gap-2 h-9">
        <Checkbox
          id="urgent"
          checked={value.urgent === true}
          onCheckedChange={(checked) =>
            onChange({
              ...value,
              urgent: checked ? true : undefined,
            })
          }
        />
        <Label htmlFor="urgent" className="whitespace-nowrap">
          Urgentes
        </Label>
      </div>

      {/* ⭐ Important */}
      <div className="flex items-center gap-2 h-9">
        <Checkbox
          id="important"
          checked={value.important === true}
          onCheckedChange={(checked) =>
            onChange({
              ...value,
              important: checked ? true : undefined,
            })
          }
        />
        <Label htmlFor="important" className="whitespace-nowrap">
          Importantes
        </Label>
      </div>

      {/* 📌 État */}
      <div className="flex items-center gap-2 min-w-[220px] h-9">
        <Label className="whitespace-nowrap">État</Label>
        <Select
          value={value.etatId !== undefined ? value.etatId.toString() : ""}
          onValueChange={(v) =>
            onChange({
              ...value,
              etatId: v === "all" ? undefined : Number(v),
            })
          }
        >
          <SelectTrigger className="h-9 w-40">
            <SelectValue placeholder="Tous" />
          </SelectTrigger>

          <SelectContent className="bg-popover text-popover-foreground">
            <SelectItem value="all">Tous</SelectItem>
            {TODO_ETAT_CATALOG.map((etat) => (
              <SelectItem
                key={etat.id}
                value={etat.id.toString()}
              >
                {etat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
