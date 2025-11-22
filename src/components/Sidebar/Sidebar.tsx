// src/components/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`bg-gray-800 text-white w-64 min-h-screen ${open ? "block" : "hidden"} md:block`}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Menu</h1>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </button>
      </div>
      <nav className="mt-4 flex flex-col gap-2">
        <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link href="/profile" className="hover:bg-gray-700 p-2 rounded">Profile</Link>
        <Link href="/settings" className="hover:bg-gray-700 p-2 rounded">Settings</Link>
      </nav>
    </aside>
  );
};
