import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthService } from '@goluckybd/api-client';
import { supabase } from '@goluckybd/api-client';

type User = { id: string; username: string; display_name: string | null; phone: string | null; avatar_url: string | null; vip_tier: string; role: string };
type AuthState = { user: User | null; session: any; loading: boolean; isAuthenticated: boolean };
type AuthContextType = AuthState & {
  signIn: (phone: string, password: string) => Promise<{ error?: string }>;
  signUp: (phone: string, password: string, username: string) => Promise<{ error?: string }>;
  sendOTP: (phone: string) => Promise<{ error?: string }>;
  verifyOTP: (phone: string, token: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, session: null, loading: true, isAuthenticated: false });

  useEffect(() => {
    checkSession();
    const { data: { subscription } } = AuthService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { profile } = await AuthService.getProfile();
        setState({ user: profile as User, session, loading: false, isAuthenticated: true });
      } else if (event === 'SIGNED_OUT') {
        setState({ user: null, session: null, loading: false, isAuthenticated: false });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function checkSession() {
    try {
      const { session } = await AuthService.getSession();
      if (session) {
        const { profile } = await AuthService.getProfile();
        setState({ user: profile as User, session, loading: false, isAuthenticated: true });
      } else {
        setState(s => ({ ...s, loading: false }));
      }
    } catch { setState(s => ({ ...s, loading: false })); }
  }

  const signIn = async (phone: string, password: string) => {
    const { error } = await AuthService.signInWithPhone(phone, password);
    return { error: error?.message };
  };
  const signUp = async (phone: string, password: string, username: string) => {
    const { error } = await AuthService.signUpWithPhone(phone, password, username);
    return { error: error?.message };
  };
  const sendOTP = async (phone: string) => {
    const { error } = await AuthService.sendOTP(phone);
    return { error: error?.message };
  };
  const verifyOTP = async (phone: string, token: string) => {
    const { error } = await AuthService.verifyOTP(phone, token);
    return { error: error?.message };
  };
  const signOut = async () => { await AuthService.signOut(); };
  const refreshProfile = async () => {
    const { profile } = await AuthService.getProfile();
    if (profile) setState(s => ({ ...s, user: profile as User }));
  };

  return <AuthContext.Provider value={{ ...state, signIn, signUp, sendOTP, verifyOTP, signOut, refreshProfile }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
