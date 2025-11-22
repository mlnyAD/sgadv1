// src/contexts/UserContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@supabase/supabase-js";
import type { Session, User } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  //
  // Chargement initial de la session
  //
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setSession(data.session ?? null);
      setLoading(false);
    };
    load();

    //
    // Écoute des changements (login / logout)
    //
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  //
  // Déconnexion
  //
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        session,
        loading,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//
// Hook pratique pour accéder au contexte
//
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUser must be used inside <UserContextProvider>");
  return ctx;
};
