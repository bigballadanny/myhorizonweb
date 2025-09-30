import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function IntegrationsSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [twilioConnected, setTwilioConnected] = useState(false);
  const [twilioConfig, setTwilioConfig] = useState({
    accountSid: '',
    authToken: '',
    phoneNumber: '',
  });

  useEffect(() => {
    checkTwilioConnection();
  }, []);

  const checkTwilioConnection = async () => {
    // Check if Twilio credentials exist in site_config
    const { data } = await supabase
      .from('site_config')
      .select('config')
      .single();

    const config = data?.config as any;
    if (config?.twilio) {
      setTwilioConnected(true);
      setTwilioConfig({
        accountSid: '••••••••',
        authToken: '••••••••',
        phoneNumber: config.twilio.phoneNumber || '',
      });
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

    // Get current config
    const { data: currentConfig } = await supabase
      .from('site_config')
      .select('config, id')
      .single();

    const existingConfig = (currentConfig?.config as any) || {};

    // Update config with Twilio credentials
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
        } as any,
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
      // Mask the saved credentials
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

    const existingConfig = (currentConfig?.config as any) || {};
    const updatedConfig = { ...existingConfig };
    delete updatedConfig.twilio;

    const { error } = await supabase
      .from('site_config')
      .update({ config: updatedConfig as any })
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
              <div className="flex items-center gap-2 text-green-600">
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