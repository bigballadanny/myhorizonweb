import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Phone, Mail, Building2, Calendar, MessageSquare, Sparkles, Clock, Plus, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  status: string;
  ai_score: number | null;
  notes: string | null;
  created_at: string;
}

interface LeadDetailDialogProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const LEAD_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'nurturing', label: 'Nurturing' },
  { value: 'appointment_scheduled', label: 'Appointment Scheduled' },
  { value: 'closed_won', label: 'Closed Won' },
  { value: 'closed_lost', label: 'Closed Lost' },
];

export function LeadDetailDialog({ lead, open, onClose, onUpdate }: LeadDetailDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', status: 'new', ai_score: 0, notes: '',
  });
  const [interactions, setInteractions] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [campaignHistory, setCampaignHistory] = useState<any[]>([]);

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || '', email: lead.email || '', phone: lead.phone || '',
        company: lead.company || '', status: lead.status, ai_score: lead.ai_score || 0, notes: lead.notes || '',
      });
      fetchLeadData(lead.id);
    }
  }, [lead]);

  const fetchLeadData = async (leadId: string) => {
    const [interactionsRes, conversationsRes, appointmentsRes, campaignRes] = await Promise.all([
      supabase.from('interactions').select('*').eq('lead_id', leadId).order('created_at', { ascending: false }),
      supabase.from('conversations').select('*').eq('lead_id', leadId).order('created_at', { ascending: false }),
      supabase.from('appointments').select('*').eq('lead_id', leadId).order('start_time', { ascending: false }),
      supabase.from('email_campaign_recipients').select('*, email_campaigns(subject, status, sent_at)').eq('lead_id', leadId).order('created_at', { ascending: false }),
    ]);
    if (interactionsRes.data) setInteractions(interactionsRes.data);
    if (conversationsRes.data) setConversations(conversationsRes.data);
    if (appointmentsRes.data) setAppointments(appointmentsRes.data);
    if (campaignRes.data) setCampaignHistory(campaignRes.data);
  };

  const handleSave = async () => {
    if (!lead) return;
    setIsLoading(true);
    const { error } = await supabase.from('leads').update({
      name: formData.name || null, email: formData.email || null, phone: formData.phone || null,
      company: formData.company || null, status: formData.status as any, ai_score: formData.ai_score || null, notes: formData.notes || null,
    }).eq('id', lead.id);
    setIsLoading(false);
    if (error) { toast({ title: 'Error updating lead', description: error.message, variant: 'destructive' }); }
    else { toast({ title: 'Lead updated successfully' }); onUpdate(); onClose(); }
  };

  const handleScoreLead = async () => {
    if (!lead) return;
    setIsScoring(true);
    try {
      const { data, error } = await supabase.functions.invoke('score-lead', { body: { leadId: lead.id } });
      if (error) throw error;
      if (data) {
        setFormData(prev => ({
          ...prev, ai_score: data.score,
          notes: prev.notes ? `${prev.notes}\n\n[AI Analysis] ${data.reasoning}\nNext Steps: ${data.nextSteps}` : `[AI Analysis] ${data.reasoning}\nNext Steps: ${data.nextSteps}`,
        }));
        toast({ title: 'Lead scored successfully', description: `Score: ${data.score}/100` });
      }
    } catch (error: any) {
      toast({ title: 'Error scoring lead', description: error.message, variant: 'destructive' });
    } finally { setIsScoring(false); }
  };

  const handleAddNote = async () => {
    if (!lead || !newNote.trim()) return;
    setIsAddingNote(true);
    const { error } = await supabase.from('interactions').insert({
      lead_id: lead.id, interaction_type: 'note', description: newNote,
    });
    if (error) { toast({ title: 'Error adding note', variant: 'destructive' }); }
    else {
      toast({ title: 'Note added' });
      setNewNote('');
      fetchLeadData(lead.id);
    }
    setIsAddingNote(false);
  };

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Lead Details</span>
            <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
              <Clock className="h-4 w-4" />
              {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="email" className="pl-10" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{LEAD_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>AI Score (0-100)</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleScoreLead} disabled={isScoring}>
                  {isScoring ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />} Score with AI
                </Button>
              </div>
              <Input type="number" min="0" max="100" value={formData.ai_score} onChange={(e) => setFormData({ ...formData, ai_score: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea rows={4} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="space-y-4">
            {/* Quick Add Note */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Plus className="h-4 w-4" /> Quick Note</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input placeholder="Add a note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddNote()} />
                  <Button size="sm" onClick={handleAddNote} disabled={isAddingNote || !newNote.trim()}>
                    {isAddingNote ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Campaign History */}
            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Send className="h-4 w-4" /> Campaigns ({campaignHistory.length})</CardTitle></CardHeader>
              <CardContent className="space-y-2 max-h-32 overflow-y-auto">
                {campaignHistory.length === 0 ? <p className="text-sm text-muted-foreground">No campaigns sent</p> : (
                  campaignHistory.map((cr: any) => (
                    <div key={cr.id} className="text-sm border-l-2 border-primary pl-2">
                      <p className="font-medium">{cr.email_campaigns?.subject}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">{cr.status}</Badge>
                        {cr.opened_at && <span className="text-green-600">Opened</span>}
                        {cr.clicked_at && <span className="text-blue-600">Clicked</span>}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Calendar className="h-4 w-4" /> Appointments ({appointments.length})</CardTitle></CardHeader>
              <CardContent className="space-y-2 max-h-32 overflow-y-auto">
                {appointments.length === 0 ? <p className="text-sm text-muted-foreground">No appointments</p> : (
                  appointments.map((apt) => (
                    <div key={apt.id} className="text-sm border-l-2 border-primary pl-2">
                      <p className="font-medium">{apt.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(apt.start_time).toLocaleString()}</p>
                      <Badge variant="outline" className="text-xs">{apt.status}</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Conversations ({conversations.length})</CardTitle></CardHeader>
              <CardContent className="space-y-2 max-h-32 overflow-y-auto">
                {conversations.length === 0 ? <p className="text-sm text-muted-foreground">No conversations</p> : (
                  conversations.map((conv) => (
                    <div key={conv.id} className="text-sm border-l-2 border-primary pl-2">
                      <p className="text-xs text-muted-foreground">{new Date(conv.created_at).toLocaleString()} · {conv.duration_seconds}s</p>
                      <p className="text-xs line-clamp-2">{conv.transcript?.substring(0, 100)}...</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Activity Timeline</CardTitle></CardHeader>
              <CardContent className="space-y-2 max-h-48 overflow-y-auto">
                {interactions.length === 0 ? <p className="text-sm text-muted-foreground">No activity</p> : (
                  interactions.map((i) => (
                    <div key={i.id} className="text-sm border-l-2 border-muted pl-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{i.interaction_type}</Badge>
                        <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(i.created_at), { addSuffix: true })}</span>
                      </div>
                      {i.description && <p className="text-xs text-muted-foreground mt-1">{i.description}</p>}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
