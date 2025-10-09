import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreVertical, Search, Download, Filter, Mail, Phone, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { exportLeadsToCSV } from '@/lib/exportUtils';

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

export function LeadPipelineBoard({ onLeadClick }: LeadPipelineBoardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

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
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus as any })
      .eq('id', leadId);

    if (error) {
      toast.error('Error updating lead');
    } else {
      toast.success('Lead status updated');
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
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
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
          <Button onClick={handleExport} variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Pipeline Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = filteredLeads.filter((lead) => lead.status === stage.value);
          
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
                          <Badge 
                            variant={lead.ai_score >= 70 ? 'default' : lead.ai_score >= 40 ? 'secondary' : 'outline'}
                            className={`ml-2 ${
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
    </div>
  );
}