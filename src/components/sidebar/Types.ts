import type { LucideIcon } from "lucide-react";
import type { UserRoleId } from "@/domain/user/roles/user-role.type";

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  roles?: UserRoleId[];
}
