"use client";

import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SidebarUserIdentity({ compact = false }: { compact?: boolean }) {
  const { user, loading } = useUser();

  if (loading || !user) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  const initials =
    user.displayName
      ?.split(" ")
      .map((p) => p[0]?.toUpperCase())
      .join("") || user.email?.[0]?.toUpperCase() || "?";

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src="" alt={initials} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      {!compact && (
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{user.displayName}</span>
          <span className="text-xs text-muted-foreground">
            {user.functionLabel}
          </span>
        </div>
      )}
    </div>
  );
}
