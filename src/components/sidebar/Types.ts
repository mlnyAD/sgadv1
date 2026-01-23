

import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}
