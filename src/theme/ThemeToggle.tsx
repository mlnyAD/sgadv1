
// src/theme/ThemeToggle.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ⚠️ c’est ok ici, car ça ne provoque pas de cascade dans next-themes
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2 p-1 rounded-full bg-inherit dark:bg-black">
      <button onClick={() => setTheme("light")} className="p-1 rounded-full bg-neutral-200 dark:bg-neutral-700">
        <Sun size={18} />
      </button>
      <button onClick={() => setTheme("system")} className="p-1 rounded-full">
        <Monitor size={18} />
      </button>
      <button onClick={() => setTheme("dark")} className="p-1 rounded-full bg-neutral-400">
        <Moon size={18} />
      </button>
    </div>
  );
}
