"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { getSupabaseBrowserClient } from "@/utils/supabase/client";
import {
  cliGetUserConnected,
  cliGetProfileByUUID,
} from "@/utils/functions/ProfileClient";

import Spinner from "@/components/IHM/Spinner";

type IdentityState = {
  fullName: string;
  email: string;
  initials: string;
  avatarURL: string;
};

// AJOUT DES PROPS ICI ↓↓↓
export default function UserIdentity({ compact = false }: { compact?: boolean }) {
  const [identity, setIdentity] = useState<IdentityState>({
    fullName: "",
    email: "",
    initials: "",
    avatarURL: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const { user } = await cliGetUserConnected();
        if (!user) {
          setError("Utilisateur non connecté.");
          return;
        }

        const userId = user.id;
        let fullName = "";
        let initials = "";
        let avatarURL = "";

        if (userId) {
          const { profile } = await cliGetProfileByUUID(userId);

          if (profile) {
            fullName = `${profile.userfirstname} ${profile.username}`.trim();
            initials =
              `${profile.userfirstname?.[0] || ""}${profile.username?.[0] || ""}`.toUpperCase();

            if (profile.avatar_url) {
              const supabase = getSupabaseBrowserClient();
              const { data: fileData } = await supabase.storage
                .from("avatars")
                .download(profile.avatar_url);

              if (fileData) avatarURL = URL.createObjectURL(fileData);
            }
          }
        }

        setIdentity({
          fullName,
          email: user.email ?? "",
          initials,
          avatarURL,
        });
      } catch (e: any) {
        setError(e.message ?? "Erreur inattendue");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  console.log("UserIdentity", identity)

  if (loading) return <Spinner size={12} height={40} />;
  if (error)
    return <div className="p-2 text-center text-red-500 text-sm">{error}</div>;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={identity.avatarURL}
          alt={identity.initials}
          className="rounded-full bg-gray-300 border"
        />
        <AvatarFallback>{identity.initials}</AvatarFallback>
      </Avatar>

      {/* SI MODE COMPACT → pas de nom/email */}
      {!compact && (
        <div className="flex-1 text-left leading-tight">
          <div className="truncate font-semibold text-sm">{identity.fullName}</div>
          <div className="truncate text-xs text-muted-foreground">{identity.email}</div>
        </div>
      )}
    </div>
  );
}
