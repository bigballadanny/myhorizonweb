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
          notes: 'Interested in AI-powered video production for brand campaign. Budget: $50K-75K'
        },
        {
          name: 'Michael Chen',
          email: 'mchen@creativestudio.com',
          phone: '+1-555-0124',
          company: 'Creative Studio Co',
          status: 'contacted' as const,
          source: 'inbound_call' as const,
          ai_score: 72,
          notes: 'Looking for documentary film production services. Needs 3 episodes'
        },
        {
          name: 'Emily Rodriguez',
          email: 'emily.r@innovatetech.io',
          phone: '+1-555-0125',
          company: 'InnovateTech',
          status: 'new' as const,
          source: 'referral' as const,
          ai_score: 90,
          notes: 'High-priority lead - Fortune 500 company seeking branded content series'
        },
        {
          name: 'David Park',
          email: 'dpark@startupventures.com',
          phone: '+1-555-0126',
          company: 'Startup Ventures',
          status: 'nurturing' as const,
          source: 'website_chat' as const,
          ai_score: 65,
          notes: 'Early-stage startup, interested in pitch video production. Limited budget'
        },
        {
          name: 'Jennifer Liu',
          email: 'jliu@globalbrands.com',
          phone: '+1-555-0127',
          company: 'Global Brands Inc',
          status: 'appointment_scheduled' as const,
          source: 'website_chat' as const,
          ai_score: 95,
          notes: 'Negotiating multi-video campaign contract - $150K budget. Very interested'
        },
        {
          name: 'Robert Thompson',
          email: 'rthompson@mediaco.com',
          phone: '+1-555-0128',
          company: 'MediaCo Productions',
          status: 'closed_won' as const,
          source: 'referral' as const,
          ai_score: 88,
          notes: 'Contract signed for Q1 2025 campaign. $85K project'
        },
        {
          name: 'Lisa Wang',
          email: 'lwang@fashionbrand.com',
          phone: '+1-555-0129',
          company: 'Fashion Brand Studio',
          status: 'qualified' as const,
          source: 'referral' as const,
          ai_score: 78,
          notes: 'Fashion brand looking for promotional videos. Timeline: 2 months'
        },
        {
          name: 'James Martinez',
          email: 'jmartinez@nonprofit.org',
          phone: '+1-555-0130',
          company: 'Community Foundation',
          status: 'contacted' as const,
          source: 'inbound_call' as const,
          ai_score: 55,
          notes: 'Non-profit seeking donation campaign video. Budget constraints'
        },
        {
          name: 'Amanda Foster',
          email: 'afoster@techstartup.io',
          phone: '+1-555-0131',
          company: 'TechStartup Inc',
          status: 'closed_won' as const,
          source: 'website_chat' as const,
          ai_score: 92,
          notes: 'Completed explainer video project. Very satisfied, wants ongoing partnership'
        },
        {
          name: 'Kevin O\'Brien',
          email: 'kobrien@retailchain.com',
          phone: '+1-555-0132',
          company: 'Retail Chain Corp',
          status: 'nurturing' as const,
          source: 'referral' as const,
          ai_score: 70,
          notes: 'Large retail chain exploring video marketing. Decision timeline: Q2 2025'
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
            description: 'Discuss project scope and budget for brand campaign. Review previous work samples',
            start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
            status: 'scheduled'
          },
          {
            lead_id: leads[2].id,
            title: 'Production Planning Meeting',
            description: 'Review content strategy and timeline for branded content series. Meet creative team',
            start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(),
            status: 'scheduled'
          },
          {
            lead_id: leads[4].id,
            title: 'Contract Review & Signing',
            description: 'Final contract discussion and signing for multi-video campaign. Legal team present',
            start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
            status: 'scheduled'
          },
          {
            lead_id: leads[6].id,
            title: 'Creative Brief Review',
            description: 'Walk through creative concepts and storyboards for fashion campaign',
            start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
            status: 'scheduled'
          },
          {
            lead_id: leads[5].id,
            title: 'Project Kickoff',
            description: 'Official project kickoff for Q1 2025 campaign. Full team introduction',
            start_time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
            status: 'completed'
          },
          {
            lead_id: leads[8].id,
            title: 'Final Delivery Review',
            description: 'Review final video edits and discuss future projects',
            start_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
            status: 'completed'
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
            description: 'Sent initial proposal and pricing information. Included case studies from similar projects'
          },
          {
            lead_id: leads[0].id,
            interaction_type: 'call',
            description: 'Follow-up call - answered questions about timeline and deliverables'
          },
          {
            lead_id: leads[1].id,
            interaction_type: 'call',
            description: 'Phone consultation about documentary requirements. Discussed 3-episode structure'
          },
          {
            lead_id: leads[1].id,
            interaction_type: 'email',
            description: 'Sent production timeline and crew information'
          },
          {
            lead_id: leads[2].id,
            interaction_type: 'meeting',
            description: 'In-person meeting at their office - very interested. Met with CMO and creative director'
          },
          {
            lead_id: leads[2].id,
            interaction_type: 'email',
            description: 'Sent detailed proposal with multiple package options'
          },
          {
            lead_id: leads[4].id,
            interaction_type: 'meeting',
            description: 'Contract negotiation meeting - agreed on terms and pricing'
          },
          {
            lead_id: leads[4].id,
            interaction_type: 'email',
            description: 'Sent final contract documents for review'
          },
          {
            lead_id: leads[5].id,
            interaction_type: 'call',
            description: 'Project kickoff call - confirmed all requirements and timelines'
          },
          {
            lead_id: leads[6].id,
            interaction_type: 'email',
            description: 'Initial outreach with portfolio and capabilities deck'
          },
          {
            lead_id: leads[7].id,
            interaction_type: 'call',
            description: 'Discussed budget constraints and alternative approaches'
          },
          {
            lead_id: leads[8].id,
            interaction_type: 'meeting',
            description: 'Final delivery and feedback session - extremely positive response'
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
