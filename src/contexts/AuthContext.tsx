import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// --- Hardcoded Admin Credentials (Insecure - Only for local demo/development bypass) ---
// The email used here is for login only. It does NOT create a real Supabase user.
const HARDCODED_ADMIN_EMAIL = 'firdaussindhi@gmail.com';
const HARDCODED_ADMIN_PASSWORD = 'javed123';
// A mock UUID is used to identify this hardcoded user internally.
const HARDCODED_ADMIN_USER_ID = '00000000-0000-0000-0000-000000000000';
// ------------------------------------------------------------------------------------

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminStatus = async (userId: string) => {
    // Hardcoded user bypasses the DB check and is always admin
    if (userId === HARDCODED_ADMIN_USER_ID) {
      setIsAdmin(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkAdminStatus(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // 1. Attempt standard Supabase sign-in (for real users)
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // 2. Hardcoded Admin Bypass
    if (error && email === HARDCODED_ADMIN_EMAIL && password === HARDCODED_ADMIN_PASSWORD) {
        // Simulate a successful login for the hardcoded admin
        console.warn('HARDCODED ADMIN BYPASS: Granting admin access.');
        const mockUser: User = {
            id: HARDCODED_ADMIN_USER_ID,
            email: HARDCODED_ADMIN_EMAIL,
            app_metadata: {},
            user_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString(),
        } as User;
        
        setUser(mockUser);
        setIsAdmin(true);
        setSession(null); // No real session, authenticated DB calls will still be blocked by RLS/policies
        error = null; // Clear the sign-in error
    }

    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const signOut = async () => {
    // Handle mock admin sign out
    if (user?.id === HARDCODED_ADMIN_USER_ID) {
      setUser(null);
      setIsAdmin(false);
      setSession(null);
    } else {
      await supabase.auth.signOut();
      setIsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};