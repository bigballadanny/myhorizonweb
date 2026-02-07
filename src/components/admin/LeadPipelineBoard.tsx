import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Mail, Phone, Building2, Clock, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { exportLeadsToCSV } from '@/lib/exportUtils';
import { formatDistanceToNow } from 'date-fns';

interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  status: string;
  ai_score: number | null;
  source: string;
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

const STAGE_VALUES: Record<string, number> = {
  new: 500,
  contacted: 1000,
  qualified: 2000,
  nurturing: 1500,
  appointment_scheduled: 3500,
  closed_won: 5000,
  closed_lost: 0,
};

export function LeadPipelineBoard({ onLeadClick }: LeadPipelineBoardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();

    const channel = supabase
      .channel('leads-pipeline-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, fetchLeads)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching leads');
      return;
    }

    setLeads(data || []);
    setIsLoading(false);
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    // Optimistic update
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus as any })
      .eq('id', leadId);

    if (error) {
      toast.error('Error updating lead');
      fetchLeads(); // Revert
    } else {
      toast.success('Lead moved to ' + PIPELINE_STAGES.find(s => s.value === newStatus)?.label);
    }
  };

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    e.dataTransfer.setData('leadId', lead.id);
    e.dataTransfer.setData('fromStatus', lead.status);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, stageValue: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverStage(stageValue);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e: React.DragEvent, stageValue: string) => {
    e.preventDefault();
    setDragOverStage(null);
    const leadId = e.dataTransfer.getData('leadId');
    const fromStatus = e.dataTransfer.getData('fromStatus');
    if (fromStatus !== stageValue) {
      handleStatusChange(leadId, stageValue);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchQuery || 
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesScore = scoreFilter === 'all' || 
      (scoreFilter === 'high' && (lead.ai_score || 0) >= 70) ||
      (scoreFilter === 'medium' && (lead.ai_score || 0) >= 40 && (lead.ai_score || 0) < 70) ||
      (scoreFilter === 'low' && (lead.ai_score || 0) < 40);
    
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

    return matchesSearch && matchesScore && matchesSource;
  });

  const pipelineValue = filteredLeads.reduce((sum, lead) => sum + (STAGE_VALUES[lead.status] || 0), 0);

  const handleExport = () => {
    exportLeadsToCSV(filteredLeads);
    toast.success('Leads exported successfully');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-muted animate-pulse rounded" />
        <div className="flex gap-4 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map((stage) => (
            <div key={stage.value} className="flex-shrink-0 w-80">
              <div className="h-6 bg-muted animate-pulse rounded w-3/4 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-muted animate-pulse rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters + Pipeline Value */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={scoreFilter} onValueChange={setScoreFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="AI Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scores</SelectItem>
              <SelectItem value="high">High (70+)</SelectItem>
              <SelectItem value="medium">Medium (40-69)</SelectItem>
              <SelectItem value="low">Low (&lt;40)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="website_chat">Website Chat</SelectItem>
              <SelectItem value="voice_call">Voice Call</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Pipeline Value</p>
              <p className="text-lg font-bold text-emerald-600">${pipelineValue.toLocaleString()}</p>
            </div>
            <Button onClick={handleExport} variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Pipeline Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = filteredLeads.filter((lead) => lead.status === stage.value);
          const stageValue = stageLeads.reduce((sum, l) => sum + (STAGE_VALUES[l.status] || 0), 0);
          const isDragOver = dragOverStage === stage.value;
          
          return (
            <div
              key={stage.value}
              className={`flex-shrink-0 w-80 rounded-xl transition-all duration-200 ${
                isDragOver ? 'bg-primary/5 ring-2 ring-primary/30' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, stage.value)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.value)}
            >
              <div className="mb-4 p-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <h3 className="font-semibold">{stage.label}</h3>
                  <Badge variant="secondary" className="ml-auto">
                    {stageLeads.length}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">${stageValue.toLocaleString()}</p>
              </div>

              <div className="space-y-3 min-h-[200px] p-2">
                {stageLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    className="p-4 cursor-grab hover:shadow-md transition-all active:cursor-grabbing active:opacity-70 active:scale-95"
                    onClick={() => onLeadClick(lead)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-3 h-3 text-muted-foreground/50" />
                          <h4 className="font-medium text-sm">
                            {lead.name || 'Unnamed Lead'}
                          </h4>
                        </div>
                        {lead.ai_score != null && (
                          <Badge 
                            variant={lead.ai_score >= 70 ? 'default' : lead.ai_score >= 40 ? 'secondary' : 'outline'}
                            className={`ml-2 text-xs ${
                              lead.ai_score >= 70 ? 'bg-green-500 text-white' : 
                              lead.ai_score >= 40 ? 'bg-yellow-500 text-white' : 
                              'bg-red-500 text-white'
                            }`}
                          >
                            {lead.ai_score}
                          </Badge>
                        )}
                      </div>

                      {lead.email && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                      )}

                      {lead.company && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Building2 className="w-3 h-3" />
                          <span className="truncate">{lead.company}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </Card>
                ))}

                {stageLeads.length === 0 && (
                  <div className={`text-center py-8 text-sm text-muted-foreground border-2 border-dashed rounded-lg ${
                    isDragOver ? 'border-primary/40' : 'border-muted'
                  }`}>
                    Drop leads here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
