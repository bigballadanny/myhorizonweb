import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Mail, RefreshCw, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { exportLeadsToCSV, exportConversationsToCSV } from '@/lib/exportUtils';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface QuickActionsProps {
  onNewLead?: () => void;
  onNavigateCampaigns?: () => void;
}

export function QuickActions({ onNewLead, onNavigateCampaigns }: QuickActionsProps) {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const { error } = await supabase.functions.invoke('sync-elevenlabs');
      if (error) throw error;
      toast({ title: 'Conversations synced successfully' });
    } catch (e: any) {
      toast({ title: 'Sync failed', description: e.message, variant: 'destructive' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const [{ data: leads }, { data: conversations }] = await Promise.all([
        supabase.from('leads').select('*'),
        supabase.from('conversations').select('*, leads(name, email)'),
      ]);
      if (leads) exportLeadsToCSV(leads);
      if (conversations) exportConversationsToCSV(conversations);
      toast({ title: 'Data exported' });
    } catch (e: any) {
      toast({ title: 'Export failed', description: e.message, variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  const actions = [
    { label: 'New Lead', icon: Plus, onClick: onNewLead, variant: 'default' as const },
    { label: 'New Campaign', icon: Mail, onClick: onNavigateCampaigns, variant: 'outline' as const },
    { label: 'Sync Conversations', icon: RefreshCw, onClick: handleSync, variant: 'outline' as const, loading: isSyncing },
    { label: 'Export All Data', icon: Download, onClick: handleExport, variant: 'outline' as const, loading: isExporting },
  ];

  return (
    <Card>
      <CardContent className="p-4 flex flex-wrap gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="sm"
            onClick={action.onClick}
            disabled={action.loading}
          >
            <action.icon className={`mr-2 h-4 w-4 ${action.loading ? 'animate-spin' : ''}`} />
            {action.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
