import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface CreateAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  preSelectedLeadId?: string;
}

export function CreateAppointmentDialog({ open, onClose, onSuccess, preSelectedLeadId }: CreateAppointmentDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lead_id: preSelectedLeadId || '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (preSelectedLeadId) {
      setFormData(prev => ({ ...prev, lead_id: preSelectedLeadId }));
    }
  }, [preSelectedLeadId]);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('id, name, email')
      .order('name');
    if (data) setLeads(data);
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.start_time || !formData.end_time) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.from('appointments').insert({
      title: formData.title,
      description: formData.description || null,
      lead_id: formData.lead_id || null,
      start_time: formData.start_time,
      end_time: formData.end_time,
      status: 'scheduled',
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: 'Error creating appointment',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Appointment created successfully' });
      setFormData({ title: '', description: '', lead_id: '', start_time: '', end_time: '' });
      onSuccess();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Discovery Call"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead">Lead (Optional)</Label>
            <Select value={formData.lead_id} onValueChange={(value) => setFormData({ ...formData, lead_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No lead</SelectItem>
                {leads.map((lead) => (
                  <SelectItem key={lead.id} value={lead.id}>
                    {lead.name || lead.email || 'Anonymous'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="start_time">Start Time *</Label>
            <Input
              id="start_time"
              type="datetime-local"
              value={formData.start_time}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end_time">End Time *</Label>
            <Input
              id="end_time"
              type="datetime-local"
              value={formData.end_time}
              onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Discuss AI automation needs..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}