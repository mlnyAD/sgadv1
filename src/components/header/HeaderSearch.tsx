// src/components/Header/HeaderSearch.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HeaderSearch() {
  return (
    <div className="relative hidden md:flex w-72">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Rechercher…"
        className="pl-10"
      />
    </div>
  );
}
