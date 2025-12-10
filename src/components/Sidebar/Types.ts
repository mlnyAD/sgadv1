import type { LucideIcon } from "lucide-react";
import type { UserRoleId } from "@/domain/user/roles/user-role.enum";

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  roles?: UserRoleId[];
}
