import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import logoIcon from '@/assets/myhorizon-logo-clean.png';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session || !active) return;
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('auth_user_id', session.user.id)
        .maybeSingle();
      if (!active) return;
      if (adminUser) navigate('/admin');
      else await supabase.auth.signOut();
    });
    return () => { active = false; };
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('id')
          .eq('auth_user_id', user.id)
          .maybeSingle();
        if (adminError || !adminUser) {
          await supabase.auth.signOut();
          throw new Error('This account has not been provisioned for admin access.');
        }
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', adminUser.id);
      }

      toast({ title: 'Welcome Back', description: 'Successfully signed in.' });
      navigate('/admin');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to sign in.';
      toast({ title: 'Sign In Failed', description: message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <img src={logoIcon} alt="MyHorizon" className="w-12 h-12 rounded-full object-cover mb-4" />
          <h1 className="font-serif text-2xl text-foreground">MyHorizon Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to access your dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@myhorizon.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white rounded-xl mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</> : 'Sign In'}
                </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-5 text-center">
            Access is provisioned by MyHorizon. Contact your administrator if you need an account.
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          MyHorizon AI Systems · Admin Portal
        </p>
      </div>
    </div>
  );
}
