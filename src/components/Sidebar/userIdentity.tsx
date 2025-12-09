"use client";

import { useUser } from "@/contexts/UserContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { useSidebar } from "@/components/ui/sidebar";

export default function UserIdentity() {
  const { user, loading } = useUser();
  const { state } = useSidebar();
  
  // collapsed si la sidebar est réduite
  const collapsed = state === "collapsed";

  if (loading || !user) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  const initials =
    user.displayName?.split(" ").map((p) => p[0]?.toUpperCase()).join("") ||
    user.email?.[0]?.toUpperCase() ||
    "?";

  return (
    <div className="flex items-center gap-2 transition-all duration-300">
      {/* Avatar */}
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src=""
          alt={initials}
          className="rounded-full bg-gray-300 border"
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      {/* Masqué en mode collapsed */}
      {!collapsed && (
        <div className="flex flex-col leading-tight transition-opacity duration-300">
          <span className="truncate font-semibold text-sm">
            {user.displayName ?? "Utilisateur"}
          </span>

          <span className="truncate text-xs text-muted-foreground">
            {user.email ?? ""}
          </span>
        </div>
      )}
    </div>
  );
}

