// src/components/Sidebar/types.ts
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

export type SupportItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};
