
// src/components/Layour/DarkMarkToggle.tsx

"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function DarkMarkToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
