import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function SampleDataGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const generateSampleData = async () => {
    setIsGenerating(true);
    try {
      // Generate sample leads
      const sampleLeads = [
        {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@techcorp.com',
          phone: '+1-555-0123',
          company: 'TechCorp Industries',
          status: 'qualified' as const,
          source: 'website_chat' as const,
          ai_score: 85,
          notes: 'Interested in AI-powered video production for brand campaign'
        },
        {
          name: 'Michael Chen',
          email: 'mchen@creativestudio.com',
          phone: '+1-555-0124',
          company: 'Creative Studio Co',
          status: 'contacted' as const,
          source: 'inbound_call' as const,
          ai_score: 72,
          notes: 'Looking for documentary film production services'
        },
        {
          name: 'Emily Rodriguez',
          email: 'emily.r@innovatetech.io',
          phone: '+1-555-0125',
          company: 'InnovateTech',
          status: 'new' as const,
          source: 'referral' as const,
          ai_score: 90,
          notes: 'High-priority lead - Fortune 500 company seeking branded content'
        },
        {
          name: 'David Park',
          email: 'dpark@startupventures.com',
          phone: '+1-555-0126',
          company: 'Startup Ventures',
          status: 'nurturing' as const,
          source: 'website_chat' as const,
          ai_score: 65,
          notes: 'Early-stage startup, interested in pitch video production'
        },
        {
          name: 'Jennifer Liu',
          email: 'jliu@globalbrands.com',
          phone: '+1-555-0127',
          company: 'Global Brands Inc',
          status: 'appointment_scheduled' as const,
          source: 'website_chat' as const,
          ai_score: 95,
          notes: 'Negotiating multi-video campaign contract - $150K budget'
        }
      ];

      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .insert(sampleLeads)
        .select();

      if (leadsError) throw leadsError;

      // Generate sample appointments for some leads
      if (leads && leads.length > 0) {
        const sampleAppointments = [
          {
            lead_id: leads[0].id,
            title: 'Initial Discovery Call',
            description: 'Discuss project scope and budget for brand campaign',
            start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
            status: 'scheduled'
          },
          {
            lead_id: leads[2].id,
            title: 'Production Planning Meeting',
            description: 'Review content strategy and timeline for branded content series',
            start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(),
            status: 'scheduled'
          },
          {
            lead_id: leads[4].id,
            title: 'Contract Review',
            description: 'Final contract discussion and signing for multi-video campaign',
            start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
            status: 'scheduled'
          }
        ];

        const { error: appointmentsError } = await supabase
          .from('appointments')
          .insert(sampleAppointments);

        if (appointmentsError) throw appointmentsError;
      }

      // Generate sample interactions
      if (leads && leads.length > 0) {
        const sampleInteractions = [
          {
            lead_id: leads[0].id,
            interaction_type: 'email',
            description: 'Sent initial proposal and pricing information'
          },
          {
            lead_id: leads[1].id,
            interaction_type: 'call',
            description: 'Phone consultation about documentary requirements'
          },
          {
            lead_id: leads[2].id,
            interaction_type: 'meeting',
            description: 'In-person meeting at their office - very interested'
          }
        ];

        const { error: interactionsError } = await supabase
          .from('interactions')
          .insert(sampleInteractions);

        if (interactionsError) throw interactionsError;
      }

      toast({
        title: 'Sample data generated!',
        description: `Created ${sampleLeads.length} leads with appointments and interactions.`
      });
      
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error generating sample data:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate sample data. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Sample Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Sample Data</DialogTitle>
          <DialogDescription>
            This will create sample leads, appointments, and interactions to help you test the system.
            You can delete this data later if needed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={generateSampleData} disabled={isGenerating}>
            {isGenerating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
