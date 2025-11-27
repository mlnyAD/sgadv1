// src/components/Header/Header.tsx
"use client";

import React from "react";
import HeaderProjet from "./HeaderProject";
import HeaderSearch from "./HeaderSearch";
import HeaderTheme from "./HeaderTheme";

export default function Header() {
  return (
    <div className="flex h-16 w-full items-center gap-4 border-b bg-muted/40 px-4 backdrop-blur-sm supports-backdrop-filter:bg-muted/60">
      
      {/* Projet (gauche) */}
      <div className="flex flex-none items-center">
        <HeaderProjet />
      </div>

      {/* Search (centre) */}
      <div className="flex flex-1 justify-center">
        <HeaderSearch />
      </div>

      {/* Actions (droite) */}
      <div className="flex flex-none items-center gap-4">
        {/* Placeholder chat simple */}
        <span className="hidden md:block text-sm text-muted-foreground">Chat</span>

        <HeaderTheme />
      </div>

    </div>
  );
}
