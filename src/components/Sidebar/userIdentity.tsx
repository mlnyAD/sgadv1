"use client";

import { useUser } from "@/contexts/UserContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function UserIdentity({ compact = false }: { compact?: boolean }) {
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

  const initials = user.displayName
    ? user.displayName
        .split(" ")
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : user.email[0]?.toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src=""
          alt={initials}
          className="rounded-full bg-gray-300 border"
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      {!compact && (
        <div className="flex-1 text-left leading-tight">
          <div className="truncate font-semibold text-sm">{user.displayName}</div>
          <div className="truncate text-xs text-muted-foreground">{user.email}</div>
        </div>
      )}
    </div>
  );
}
