import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Phone, CheckCircle2, AlertCircle, Loader2, Mic, RefreshCw } from 'lucide-react';

export function IntegrationsSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [twilioConnected, setTwilioConnected] = useState(false);
  const [twilioConfig, setTwilioConfig] = useState({
    accountSid: '',
    authToken: '',
    phoneNumber: '',
  });

  useEffect(() => {
    checkTwilioConnection();
    checkLastSync();
  }, []);

  const checkLastSync = async () => {
    // Get most recent conversation synced via API
    const { data } = await supabase
      .from('conversations')
      .select('created_at, metadata')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data?.metadata && typeof data.metadata === 'object' && 'synced_at' in data.metadata) {
      setLastSync(data.metadata.synced_at as string);
    }
  };

  const checkTwilioConnection = async () => {
    const { data } = await supabase
      .from('site_config')
      .select('config')
      .single();

    const config = data?.config as Record<string, unknown> | null;
    if (config?.twilio) {
      setTwilioConnected(true);
      const twilioData = config.twilio as Record<string, string>;
      setTwilioConfig({
        accountSid: '••••••••',
        authToken: '••••••••',
        phoneNumber: twilioData.phoneNumber || '',
      });
    }
  };

  const handleSyncElevenLabs = async () => {
    setIsSyncing(true);

    try {
      const { data, error } = await supabase.functions.invoke('sync-elevenlabs');

      if (error) throw error;

      toast({
        title: 'Sync Complete',
        description: `Synced ${data?.synced || 0} new conversations, ${data?.skipped || 0} already existed.`,
      });

      setLastSync(new Date().toISOString());
    } catch (err) {
      console.error('Sync error:', err);
      toast({
        title: 'Sync Failed',
        description: err instanceof Error ? err.message : 'Failed to sync conversations',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveTwilio = async () => {
    if (!twilioConfig.accountSid || !twilioConfig.authToken || !twilioConfig.phoneNumber) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all Twilio fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const { data: currentConfig } = await supabase
      .from('site_config')
      .select('config, id')
      .single();

    const existingConfig = (currentConfig?.config as Record<string, unknown>) || {};

    const { error } = await supabase
      .from('site_config')
      .update({
        config: {
          ...existingConfig,
          twilio: {
            accountSid: twilioConfig.accountSid,
            authToken: twilioConfig.authToken,
            phoneNumber: twilioConfig.phoneNumber,
          },
        },
      })
      .eq('id', currentConfig?.id || '00000000-0000-0000-0000-000000000000');

    setIsLoading(false);

    if (error) {
      toast({
        title: 'Error saving Twilio credentials',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setTwilioConnected(true);
      toast({ title: 'Twilio credentials saved successfully' });
      setTwilioConfig(prev => ({
        ...prev,
        accountSid: '••••••••',
        authToken: '••••••••',
      }));
    }
  };

  const handleDisconnectTwilio = async () => {
    setIsLoading(true);

    const { data: currentConfig } = await supabase
      .from('site_config')
      .select('config, id')
      .single();

    const existingConfig = (currentConfig?.config as Record<string, unknown>) || {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { twilio, ...updatedConfig } = existingConfig;

    const { error } = await supabase
      .from('site_config')
      .update({ config: updatedConfig as unknown as null })
      .eq('id', currentConfig?.id || '00000000-0000-0000-0000-000000000000');

    setIsLoading(false);

    if (error) {
      toast({
        title: 'Error disconnecting Twilio',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setTwilioConnected(false);
      setTwilioConfig({ accountSid: '', authToken: '', phoneNumber: '' });
      toast({ title: 'Twilio disconnected successfully' });
    }
  };

  return (
    <div className="space-y-6">
      {/* ElevenLabs Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Mic className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <CardTitle>ElevenLabs Voice Agent</CardTitle>
                <CardDescription>AI voice conversations are captured automatically</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium">Agent ID</p>
              <p className="text-xs text-muted-foreground font-mono">agent_3701k6bjf9q2e5wsc1y94xbg2r3g</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Last Sync</p>
              <p className="text-xs text-muted-foreground">
                {lastSync ? new Date(lastSync).toLocaleString() : 'Never'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleSyncElevenLabs} 
              disabled={isSyncing}
              variant="outline"
              className="flex-1"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Conversations
                </>
              )}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
            <p className="font-medium mb-1">How it works:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Conversations are captured in real-time via the React SDK</li>
              <li>Use "Sync Conversations" to fetch any missed conversations from ElevenLabs API</li>
              <li>Leads are automatically created from contact info collected during calls</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Twilio Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Twilio Integration</CardTitle>
                <CardDescription>Enable outbound AI calling with Twilio</CardDescription>
              </div>
            </div>
            {twilioConnected ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Not Connected</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountSid">Account SID</Label>
            <Input
              id="accountSid"
              type="text"
              placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={twilioConfig.accountSid}
              onChange={(e) => setTwilioConfig({ ...twilioConfig, accountSid: e.target.value })}
              disabled={twilioConnected}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authToken">Auth Token</Label>
            <Input
              id="authToken"
              type="password"
              placeholder="Your Twilio Auth Token"
              value={twilioConfig.authToken}
              onChange={(e) => setTwilioConfig({ ...twilioConfig, authToken: e.target.value })}
              disabled={twilioConnected}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Twilio Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1234567890"
              value={twilioConfig.phoneNumber}
              onChange={(e) => setTwilioConfig({ ...twilioConfig, phoneNumber: e.target.value })}
              disabled={twilioConnected}
            />
          </div>

          <div className="flex gap-2">
            {!twilioConnected ? (
              <Button onClick={handleSaveTwilio} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Connect Twilio
              </Button>
            ) : (
              <Button variant="outline" onClick={handleDisconnectTwilio} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Disconnect
              </Button>
            )}
          </div>

          <div className="text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
            <p className="font-medium mb-1">How to get your Twilio credentials:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to your Twilio Console</li>
              <li>Copy your Account SID and Auth Token</li>
              <li>Purchase or use an existing phone number</li>
              <li>Paste the credentials above</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}