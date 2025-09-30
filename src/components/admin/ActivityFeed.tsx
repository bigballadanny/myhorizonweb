import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  Phone, 
  Calendar, 
  Mail, 
  MessageSquare, 
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'lead' | 'appointment' | 'interaction' | 'conversation';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  color: string;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivities();

    // Real-time subscriptions for live updates
    const leadsChannel = supabase
      .channel('activity-leads')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, handleNewLead)
      .subscribe();

    const appointmentsChannel = supabase
      .channel('activity-appointments')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'appointments' }, handleNewAppointment)
      .subscribe();

    const interactionsChannel = supabase
      .channel('activity-interactions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'interactions' }, handleNewInteraction)
      .subscribe();

    const conversationsChannel = supabase
      .channel('activity-conversations')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'conversations' }, handleNewConversation)
      .subscribe();

    return () => {
      supabase.removeChannel(leadsChannel);
      supabase.removeChannel(appointmentsChannel);
      supabase.removeChannel(interactionsChannel);
      supabase.removeChannel(conversationsChannel);
    };
  }, []);

  const handleNewLead = () => fetchActivities();
  const handleNewAppointment = () => fetchActivities();
  const handleNewInteraction = () => fetchActivities();
  const handleNewConversation = () => fetchActivities();

  const fetchActivities = async () => {
    setIsLoading(true);
    const allActivities: Activity[] = [];

    // Fetch recent leads
    const { data: leads } = await supabase
      .from('leads')
      .select('id, name, email, created_at, source')
      .order('created_at', { ascending: false })
      .limit(10);

    leads?.forEach((lead) => {
      allActivities.push({
        id: `lead-${lead.id}`,
        type: 'lead',
        title: 'New Lead',
        description: `${lead.name || lead.email || 'Anonymous'} from ${lead.source}`,
        timestamp: lead.created_at,
        icon: UserPlus,
        color: 'text-blue-600',
      });
    });

    // Fetch recent appointments
    const { data: appointments } = await supabase
      .from('appointments')
      .select('id, title, created_at, lead_id')
      .order('created_at', { ascending: false })
      .limit(10);

    appointments?.forEach((apt) => {
      allActivities.push({
        id: `apt-${apt.id}`,
        type: 'appointment',
        title: 'New Appointment',
        description: apt.title,
        timestamp: apt.created_at,
        icon: Calendar,
        color: 'text-purple-600',
      });
    });

    // Fetch recent interactions
    const { data: interactions } = await supabase
      .from('interactions')
      .select('id, interaction_type, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    interactions?.forEach((interaction) => {
      const iconMap: { [key: string]: any } = {
        email: Mail,
        call: Phone,
        meeting: Calendar,
        note: MessageSquare,
      };

      allActivities.push({
        id: `int-${interaction.id}`,
        type: 'interaction',
        title: 'New Interaction',
        description: interaction.interaction_type,
        timestamp: interaction.created_at,
        icon: iconMap[interaction.interaction_type] || MessageSquare,
        color: 'text-green-600',
      });
    });

    // Fetch recent conversations
    const { data: conversations } = await supabase
      .from('conversations')
      .select('id, call_type, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    conversations?.forEach((conv) => {
      allActivities.push({
        id: `conv-${conv.id}`,
        type: 'conversation',
        title: 'AI Call Completed',
        description: `${conv.call_type || 'Call'} conversation`,
        timestamp: conv.created_at,
        icon: Phone,
        color: 'text-orange-600',
      });
    });

    // Sort all activities by timestamp
    allActivities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setActivities(allActivities.slice(0, 20));
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Real-time updates from your CRM</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-4 items-start">
                  <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}