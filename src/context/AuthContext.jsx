import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  signInWithPassword,
  signOut as signOutRequest,
  getStoredSession,
  storeSession,
  clearStoredSession,
} from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore a persisted mock session on first load (swap for
  // supabase.auth.getSession() later).
  useEffect(() => {
    setSession(getStoredSession());
    setLoading(false);
  }, []);

  const login = useCallback(async ({ email, password, remember }) => {
    const { data, error } = await signInWithPassword({ email, password });
    if (error) return { error };

    storeSession(data.session, { remember });
    setSession(data.session);
    return { error: null };
  }, []);

  const logout = useCallback(async () => {
    await signOutRequest();
    clearStoredSession();
    setSession(null);
  }, []);

  const value = {
    session,
    user: session?.user ?? null,
    isAuthenticated: Boolean(session),
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
