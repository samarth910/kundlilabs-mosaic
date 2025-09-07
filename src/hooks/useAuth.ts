import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          isAuthenticated: !!session?.user,
        });
      }
    );

    // THEN check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          isAuthenticated: !!session?.user,
        });
      } catch (error) {
        console.error('Error getting session:', error);
        setAuthState({
          user: null,
          session: null,
          loading: false,
          isAuthenticated: false,
        });
      }
    };

    getInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        return { error };
      }
      return { error: null };
    } catch (err) {
      console.error('Unexpected error during sign out:', err);
      return { error: err as Error };
    }
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Error refreshing session:', error);
        return { error };
      }
      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error during session refresh:', err);
      return { error: err as Error };
    }
  }, []);

  return {
    ...authState,
    signOut,
    refreshSession,
  };
};