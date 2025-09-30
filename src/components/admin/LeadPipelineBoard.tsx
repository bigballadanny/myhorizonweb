import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Building2, Star } from 'lucide-react';

interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  status: string;
  ai_score: number | null;
  created_at: string;
}

interface LeadPipelineBoardProps {
  onLeadClick: (lead: Lead) => void;
}

const PIPELINE_STAGES = [
  { value: 'new', label: 'New', color: 'bg-blue-500' },
  { value: 'contacted', label: 'Contacted', color: 'bg-purple-500' },
  { value: 'qualified', label: 'Qualified', color: 'bg-green-500' },
  { value: 'nurturing', label: 'Nurturing', color: 'bg-yellow-500' },
  { value: 'appointment_scheduled', label: 'Appointment', color: 'bg-orange-500' },
  { value: 'closed_won', label: 'Won', color: 'bg-emerald-500' },
  { value: 'closed_lost', label: 'Lost', color: 'bg-red-500' },
];

export function LeadPipelineBoard({ onLeadClick }: LeadPipelineBoardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error fetching leads',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    setLeads(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeads();

    // Set up realtime subscription
    const channel = supabase
      .channel('leads-pipeline-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads',
        },
        (payload) => {
          console.log('Lead change detected:', payload);
          fetchLeads(); // Refetch all leads on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus as any })
      .eq('id', leadId);

    if (error) {
      toast({
        title: 'Error updating lead',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Lead updated',
        description: 'Lead status changed successfully',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading pipeline...</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {PIPELINE_STAGES.map((stage) => {
        const stageLeads = getLeadsByStatus(stage.value);
        
        return (
          <div key={stage.value} className="flex-shrink-0 w-80">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                <h3 className="font-semibold">{stage.label}</h3>
                <Badge variant="secondary" className="ml-auto">
                  {stageLeads.length}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              {stageLeads.map((lead) => (
                <Card
                  key={lead.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onLeadClick(lead)}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">
                        {lead.name || 'Unnamed Lead'}
                      </h4>
                      {lead.ai_score && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{lead.ai_score}</span>
                        </div>
                      )}
                    </div>

                    {lead.email && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    )}

                    {lead.phone && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{lead.phone}</span>
                      </div>
                    )}

                    {lead.company && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        <span className="truncate">{lead.company}</span>
                      </div>
                    )}

                    {/* Quick status change dropdown */}
                    <select
                      className="w-full text-xs border rounded px-2 py-1 bg-background"
                      value={lead.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(lead.id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {PIPELINE_STAGES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Card>
              ))}

              {stageLeads.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No leads in this stage
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
