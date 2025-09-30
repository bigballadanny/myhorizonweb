import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type AdminRole = Database['public']['Enums']['admin_role'];

interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  last_login: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch admin user data when authenticated
        if (session?.user) {
          setTimeout(async () => {
            const { data } = await supabase
              .from('admin_users')
              .select('id, email, role, last_login')
              .eq('auth_user_id', session.user.id)
              .single();
            
            setAdminUser(data);
            setIsLoading(false);
          }, 0);
        } else {
          setAdminUser(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data } = await supabase
          .from('admin_users')
          .select('id, email, role, last_login')
          .eq('auth_user_id', session.user.id)
          .single();
        
        setAdminUser(data);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setAdminUser(null);
  };

  const hasRole = (roles: AdminRole | AdminRole[]) => {
    if (!adminUser) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(adminUser.role);
  };

  return {
    user,
    session,
    adminUser,
    isLoading,
    isAuthenticated: !!session,
    signOut,
    hasRole,
    isSuperAdmin: adminUser?.role === 'super_admin',
    isAdmin: adminUser?.role === 'admin' || adminUser?.role === 'super_admin',
  };
}
