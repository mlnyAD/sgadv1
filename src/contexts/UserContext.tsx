"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { AuthenticatedUser } from "@/domain/user/authenticated-user.interface";

interface UserContextType {
  user: AuthenticatedUser | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const res = await fetch("/api/auth/me");
      const json = await res.json();

      if (json.user) {
        // COPIE EXACTEMENT L’OBJET RETOURNÉ PAR L’API
        setUser(json.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Erreur UserContext:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
