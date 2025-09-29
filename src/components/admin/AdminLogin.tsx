import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  open: boolean;
  onClose: () => void;
}

export function AdminLogin({ open, onClose }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === '12345678') {
      setIsLoading(true);
      
      // Store admin session
      sessionStorage.setItem('admin_authenticated', 'true');
      
      toast({
        title: "Welcome Back",
        description: "Admin access granted",
      });
      
      // Use window.location instead of useNavigate to avoid Router context issues
      setTimeout(() => {
        window.location.href = '/admin';
      }, 500);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Access</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Login'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
