import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AdminLoginProps {
  open: boolean;
  onClose: () => void;
}

export function AdminLogin({ open, onClose }: AdminLoginProps) {
  useEffect(() => {
    if (open) {
      // Redirect to auth page when dialog opens
      window.location.href = '/auth';
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Access Required</DialogTitle>
          <DialogDescription>
            Redirecting to authentication page...
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Button onClick={() => window.location.href = '/auth'}>
            Go to Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
