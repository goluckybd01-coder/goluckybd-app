'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthService } from '@goluckybd/api-client';

type User = { id: string; username: string; display_name: string | null; avatar_url: string | null; vip_tier: string };
type AuthContextType = { user: User | null; loading: boolean; isAuthenticated: boolean; signOut: () => Promise<void>; refreshProfile: () => Promise<void> };

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isAuthenticated: false, signOut: async () => {}, refreshProfile: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.getSession().then(async ({ session }) => {
      if (session) { const { profile } = await AuthService.getProfile(); setUser(profile as User); }
      setLoading(false);
    });
    const { data: { subscription } } = AuthService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') { const { profile } = await AuthService.getProfile(); setUser(profile as User); }
      else if (event === 'SIGNED_OUT') setUser(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => { await AuthService.signOut(); setUser(null); };
  const refreshProfile = async () => { const { profile } = await AuthService.getProfile(); if (profile) setUser(profile as User); };

  return <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, signOut, refreshProfile }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
