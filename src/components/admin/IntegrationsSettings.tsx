import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Phone, CheckCircle2, AlertCircle, Loader2, Mic, RefreshCw, Globe, Zap, Activity, Copy } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

export function IntegrationsSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [twilioConnected, setTwilioConnected] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);
  const [leadCount, setLeadCount] = useState(0);
  const [twilioConfig, setTwilioConfig] = useState({ accountSid: '', authToken: '', phoneNumber: '' });

  const webhookUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-webhook`;

  useEffect(() => {
    checkTwilioConnection();
    checkLastSync();
    fetchSystemStats();
  }, []);

  const fetchSystemStats = async () => {
    const [convRes, leadRes] = await Promise.all([
      supabase.from('conversations').select('id', { count: 'exact', head: true }),
      supabase.from('leads').select('id', { count: 'exact', head: true }),
    ]);
    setConversationCount(convRes.count || 0);
    setLeadCount(leadRes.count || 0);
  };

  const checkLastSync = async () => {
    const { data } = await supabase.from('conversations').select('created_at, metadata').order('created_at', { ascending: false }).limit(1).maybeSingle();
    if (data?.metadata && typeof data.metadata === 'object' && 'synced_at' in data.metadata) {
      setLastSync(data.metadata.synced_at as string);
    }
  };

  const checkTwilioConnection = async () => {
    const { data } = await supabase.from('site_config').select('config').single();
    const config = data?.config as Record<string, unknown> | null;
    if (config?.twilio) {
      setTwilioConnected(true);
      const twilioData = config.twilio as Record<string, string>;
      setTwilioConfig({ accountSid: '••••••••', authToken: '••••••••', phoneNumber: twilioData.phoneNumber || '' });
    }
  };

  const handleSyncElevenLabs = async () => {
    setIsSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('sync-elevenlabs');
      if (error) throw error;
      toast({ title: 'Sync Complete', description: `Synced ${data?.synced || 0} new conversations.` });
      setLastSync(new Date().toISOString());
      fetchSystemStats();
    } catch (err) {
      toast({ title: 'Sync Failed', description: err instanceof Error ? err.message : 'Failed', variant: 'destructive' });
    } finally { setIsSyncing(false); }
  };

  const handleTestWebhook = async () => {
    setIsTesting(true);
    try {
      const { data, error } = await supabase.functions.invoke('elevenlabs-webhook-test');
      if (error) throw error;
      toast({ title: 'Webhook Test', description: data?.message || 'Webhook endpoint is responsive.' });
    } catch {
      toast({ title: 'Webhook test failed', variant: 'destructive' });
    } finally { setIsTesting(false); }
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    sonnerToast.success('Webhook URL copied to clipboard');
  };

  const handleSaveTwilio = async () => {
    if (!twilioConfig.accountSid || !twilioConfig.authToken || !twilioConfig.phoneNumber) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' }); return;
    }
    setIsLoading(true);
    const { data: currentConfig } = await supabase.from('site_config').select('config, id').single();
    const existingConfig = (currentConfig?.config as Record<string, unknown>) || {};
    const { error } = await supabase.from('site_config').update({
      config: { ...existingConfig, twilio: { accountSid: twilioConfig.accountSid, authToken: twilioConfig.authToken, phoneNumber: twilioConfig.phoneNumber } },
    }).eq('id', currentConfig?.id || '');
    setIsLoading(false);
    if (error) toast({ title: 'Error saving', variant: 'destructive' });
    else { setTwilioConnected(true); toast({ title: 'Twilio connected' }); setTwilioConfig(p => ({ ...p, accountSid: '••••••••', authToken: '••••••••' })); }
  };

  const handleDisconnectTwilio = async () => {
    setIsLoading(true);
    const { data: currentConfig } = await supabase.from('site_config').select('config, id').single();
    const existingConfig = (currentConfig?.config as Record<string, unknown>) || {};
    const { twilio, ...rest } = existingConfig;
    const { error } = await supabase.from('site_config').update({ config: rest as unknown as null }).eq('id', currentConfig?.id || '');
    setIsLoading(false);
    if (error) toast({ title: 'Error disconnecting', variant: 'destructive' });
    else { setTwilioConnected(false); setTwilioConfig({ accountSid: '', authToken: '', phoneNumber: '' }); toast({ title: 'Twilio disconnected' }); }
  };

  return (
    <div className="space-y-6">
      {/* System Health */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg"><Activity className="h-6 w-6 text-emerald-500" /></div>
            <div><CardTitle>System Health</CardTitle><CardDescription>Overview of your backend services</CardDescription></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-2xl font-bold">{conversationCount}</p>
              <p className="text-xs text-muted-foreground">Total Conversations</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-2xl font-bold">{leadCount}</p>
              <p className="text-xs text-muted-foreground">Total Leads</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-sm font-medium text-emerald-600">Online</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Backend Functions</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm font-medium">{lastSync ? new Date(lastSync).toLocaleDateString() : 'Never'}</p>
              <p className="text-xs text-muted-foreground">Last Sync</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Globe className="h-6 w-6 text-primary" /></div>
              <div><CardTitle>Webhook Configuration</CardTitle><CardDescription>ElevenLabs webhook endpoint for real-time data</CardDescription></div>
            </div>
            <Badge variant="outline" className="text-emerald-600 border-emerald-600"><Zap className="h-3 w-3 mr-1" /> Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm">Webhook URL</Label>
            <div className="flex gap-2 mt-1">
              <Input readOnly value={webhookUrl} className="font-mono text-xs" />
              <Button variant="outline" size="icon" onClick={copyWebhookUrl}><Copy className="h-4 w-4" /></Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Configure this URL in your ElevenLabs agent settings under Webhooks.</p>
          </div>
          <Button variant="outline" onClick={handleTestWebhook} disabled={isTesting}>
            {isTesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />} Test Webhook
          </Button>
        </CardContent>
      </Card>

      {/* ElevenLabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg"><Mic className="h-6 w-6 text-accent-foreground" /></div>
              <div><CardTitle>ElevenLabs Voice Agent</CardTitle><CardDescription>AI voice conversations captured automatically</CardDescription></div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /><span className="text-sm font-medium">Connected</span></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div><p className="text-sm font-medium">Agent ID</p><p className="text-xs text-muted-foreground font-mono">agent_3701k6bjf9q2e5wsc1y94xbg2r3g</p></div>
            <div className="text-right"><p className="text-sm font-medium">Last Sync</p><p className="text-xs text-muted-foreground">{lastSync ? new Date(lastSync).toLocaleString() : 'Never'}</p></div>
          </div>
          <Button onClick={handleSyncElevenLabs} disabled={isSyncing} variant="outline" className="w-full">
            {isSyncing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Syncing...</> : <><RefreshCw className="mr-2 h-4 w-4" />Sync Conversations</>}
          </Button>
        </CardContent>
      </Card>

      {/* Twilio */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Phone className="h-6 w-6 text-primary" /></div>
              <div><CardTitle>Twilio Integration</CardTitle><CardDescription>Enable outbound AI calling</CardDescription></div>
            </div>
            {twilioConnected ? (
              <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /><span className="text-sm font-medium">Connected</span></div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground"><AlertCircle className="h-5 w-5" /><span className="text-sm font-medium">Not Connected</span></div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Account SID</Label><Input placeholder="ACxxxxxxxx" value={twilioConfig.accountSid} onChange={(e) => setTwilioConfig({ ...twilioConfig, accountSid: e.target.value })} disabled={twilioConnected} /></div>
          <div className="space-y-2"><Label>Auth Token</Label><Input type="password" placeholder="Your Auth Token" value={twilioConfig.authToken} onChange={(e) => setTwilioConfig({ ...twilioConfig, authToken: e.target.value })} disabled={twilioConnected} /></div>
          <div className="space-y-2"><Label>Phone Number</Label><Input placeholder="+1234567890" value={twilioConfig.phoneNumber} onChange={(e) => setTwilioConfig({ ...twilioConfig, phoneNumber: e.target.value })} disabled={twilioConnected} /></div>
          <div className="flex gap-2">
            {!twilioConnected ? (
              <Button onClick={handleSaveTwilio} disabled={isLoading}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Connect Twilio</Button>
            ) : (
              <Button variant="outline" onClick={handleDisconnectTwilio} disabled={isLoading}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Disconnect</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
