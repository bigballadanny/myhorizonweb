import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Send, Eye, Mail, Users, BarChart3, Loader2, ArrowLeft, Copy, Trash2, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface Campaign {
  id: string;
  subject: string;
  body_html: string;
  status: string;
  recipient_filter: any;
  total_recipients: number;
  total_sent: number;
  total_opened: number;
  total_clicked: number;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body_html: string;
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  sending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  sent: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

const LEAD_STATUS_OPTIONS = [
  { value: 'all', label: 'All Leads' },
  { value: 'new', label: 'New Leads' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'nurturing', label: 'Nurturing' },
  { value: 'appointment_scheduled', label: 'Appointment Scheduled' },
];

export function EmailCampaigns() {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSendConfirm, setShowSendConfirm] = useState<Campaign | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [leadCount, setLeadCount] = useState(0);

  const [subject, setSubject] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [recipientFilter, setRecipientFilter] = useState('all');

  useEffect(() => {
    fetchCampaigns();
    fetchTemplates();
    const channel = supabase.channel('campaigns-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'email_campaigns' }, fetchCampaigns).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchCampaigns = async () => {
    const { data } = await supabase.from('email_campaigns').select('*').order('created_at', { ascending: false });
    if (data) setCampaigns(data as unknown as Campaign[]);
    setIsLoading(false);
  };

  const fetchTemplates = async () => {
    const { data } = await supabase.from('email_templates').select('*').order('created_at', { ascending: true });
    if (data) setTemplates(data as unknown as EmailTemplate[]);
  };

  const fetchLeadCount = async (filter: string) => {
    let query = supabase.from('leads').select('id', { count: 'exact', head: true });
    if (filter !== 'all') query = query.eq('status', filter as any);
    const { count } = await query;
    setLeadCount(count || 0);
  };

  useEffect(() => { fetchLeadCount(recipientFilter); }, [recipientFilter]);

  const handleCreate = async () => {
    if (!subject.trim()) { toast({ title: 'Subject is required', variant: 'destructive' }); return; }
    setIsSaving(true);
    const { error } = await supabase.from('email_campaigns').insert({
      subject, body_html: bodyHtml, status: 'draft' as any,
      recipient_filter: { status: recipientFilter === 'all' ? null : recipientFilter },
      total_recipients: leadCount,
    } as any);
    setIsSaving(false);
    if (error) { toast({ title: 'Error creating campaign', description: error.message, variant: 'destructive' }); }
    else { toast({ title: 'Campaign created as draft' }); resetForm(); }
  };

  const resetForm = () => {
    setShowCreate(false); setSubject(''); setBodyHtml(''); setRecipientFilter('all');
  };

  const handleClone = async (campaign: Campaign) => {
    const { error } = await supabase.from('email_campaigns').insert({
      subject: `Copy of ${campaign.subject}`, body_html: campaign.body_html, status: 'draft' as any,
      recipient_filter: campaign.recipient_filter, total_recipients: campaign.total_recipients,
    } as any);
    if (error) toast({ title: 'Error cloning', variant: 'destructive' });
    else toast({ title: 'Campaign cloned' });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('email_campaigns').delete().eq('id', id);
    if (error) toast({ title: 'Error deleting', variant: 'destructive' });
    else { toast({ title: 'Campaign deleted' }); if (selectedCampaign?.id === id) setSelectedCampaign(null); }
  };

  const handleSend = async (campaign: Campaign) => {
    const { error } = await supabase.from('email_campaigns').update({ status: 'sent' as any, sent_at: new Date().toISOString() } as any).eq('id', campaign.id);
    if (error) toast({ title: 'Error sending', variant: 'destructive' });
    else { toast({ title: 'Campaign marked as sent' }); setShowSendConfirm(null); }
  };

  const useTemplate = (template: EmailTemplate) => {
    setSubject(template.subject);
    setBodyHtml(template.body_html);
    setShowTemplates(false);
    setShowCreate(true);
  };

  const openRate = (c: Campaign) => c.total_sent > 0 ? Math.round((c.total_opened / c.total_sent) * 100) : 0;
  const clickRate = (c: Campaign) => c.total_sent > 0 ? Math.round((c.total_clicked / c.total_sent) * 100) : 0;

  if (selectedCampaign) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setSelectedCampaign(null)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedCampaign.subject}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={STATUS_COLORS[selectedCampaign.status]}>{selectedCampaign.status}</Badge>
                {selectedCampaign.status === 'draft' && (
                  <Button size="sm" onClick={() => setShowSendConfirm(selectedCampaign)}><Send className="h-4 w-4 mr-1" /> Send</Button>
                )}
                <Button size="sm" variant="outline" onClick={() => handleClone(selectedCampaign)}><Copy className="h-4 w-4 mr-1" /> Clone</Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(selectedCampaign.id)}><Trash2 className="h-4 w-4 mr-1" /> Delete</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Recipients', value: selectedCampaign.total_recipients, icon: Users },
                { label: 'Sent', value: selectedCampaign.total_sent, icon: Send },
                { label: 'Open Rate', value: `${openRate(selectedCampaign)}%`, icon: Eye },
                { label: 'Click Rate', value: `${clickRate(selectedCampaign)}%`, icon: BarChart3 },
              ].map((stat) => (
                <Card key={stat.label}><CardContent className="p-4 text-center"><stat.icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" /><div className="text-2xl font-bold">{stat.value}</div><div className="text-xs text-muted-foreground">{stat.label}</div></CardContent></Card>
              ))}
            </div>
            <div>
              <Label className="text-sm font-medium">Email Body Preview</Label>
              <div className="mt-2 border rounded-lg p-4 bg-muted/30 text-sm" dangerouslySetInnerHTML={{ __html: selectedCampaign.body_html || 'No content' }} />
            </div>
            <div className="text-sm text-muted-foreground">Created: {format(new Date(selectedCampaign.created_at), 'PPp')}{selectedCampaign.sent_at && <> · Sent: {format(new Date(selectedCampaign.sent_at), 'PPp')}</>}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Campaigns</h2>
          <p className="text-muted-foreground">Create and manage email campaigns for your leads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTemplates(true)}><FileText className="mr-2 h-4 w-4" /> Templates</Button>
          <Button onClick={() => setShowCreate(true)}><Plus className="mr-2 h-4 w-4" /> New Campaign</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Campaigns', value: campaigns.length, icon: Mail },
          { label: 'Sent', value: campaigns.filter(c => c.status === 'sent').length, icon: Send },
          { label: 'Drafts', value: campaigns.filter(c => c.status === 'draft').length, icon: Eye },
        ].map((stat) => (
          <Card key={stat.label}><CardContent className="p-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-primary/10"><stat.icon className="h-5 w-5 text-primary" /></div><div><div className="text-2xl font-bold">{stat.value}</div><div className="text-xs text-muted-foreground">{stat.label}</div></div></CardContent></Card>
        ))}
      </div>

      {/* Campaign List */}
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : campaigns.length === 0 ? (
        <Card><CardContent className="py-12 text-center"><Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" /><h3 className="text-lg font-semibold mb-2">No campaigns yet</h3><p className="text-muted-foreground mb-4">Create your first email campaign.</p><Button onClick={() => setShowCreate(true)}><Plus className="mr-2 h-4 w-4" /> Create Campaign</Button></CardContent></Card>
      ) : (
        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedCampaign(campaign)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10"><Mail className="h-5 w-5 text-primary" /></div>
                  <div>
                    <h4 className="font-semibold">{campaign.subject}</h4>
                    <p className="text-sm text-muted-foreground">{campaign.total_recipients} recipients · {format(new Date(campaign.created_at), 'MMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {campaign.status === 'draft' && (
                    <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setShowSendConfirm(campaign); }}><Send className="h-3 w-3 mr-1" /> Send</Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleClone(campaign); }}><Copy className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(campaign.id); }}><Trash2 className="h-3 w-3" /></Button>
                  {campaign.status === 'sent' && <span className="text-sm text-muted-foreground">{openRate(campaign)}% opened</span>}
                  <Badge className={STATUS_COLORS[campaign.status]}>{campaign.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Campaign Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Create New Campaign</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Subject Line</Label>
              <Input placeholder="e.g. Discover how AI can save you 20+ hours/week" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Recipients</Label>
              <Select value={recipientFilter} onValueChange={setRecipientFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{LEAD_STATUS_OPTIONS.map((opt) => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">{leadCount} leads will receive this campaign</p>
            </div>
            <div className="space-y-2">
              <Label>Email Body (HTML)</Label>
              <Textarea rows={10} placeholder="Write your email content..." value={bodyHtml} onChange={(e) => setBodyHtml(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save as Draft</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Templates Dialog */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Email Templates</DialogTitle></DialogHeader>
          <div className="space-y-3">
            {templates.map((t) => (
              <Card key={t.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => useTemplate(t)}>
                <CardContent className="p-4">
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.subject}</p>
                </CardContent>
              </Card>
            ))}
            {templates.length === 0 && <p className="text-muted-foreground text-center py-4">No templates available</p>}
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Confirmation Dialog */}
      <Dialog open={!!showSendConfirm} onOpenChange={() => setShowSendConfirm(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Send Campaign?</DialogTitle></DialogHeader>
          <p className="text-muted-foreground">This will mark "<strong>{showSendConfirm?.subject}</strong>" as sent to {showSendConfirm?.total_recipients} recipients. This action cannot be undone.</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowSendConfirm(null)}>Cancel</Button>
            <Button onClick={() => showSendConfirm && handleSend(showSendConfirm)}><Send className="h-4 w-4 mr-2" /> Send Now</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
