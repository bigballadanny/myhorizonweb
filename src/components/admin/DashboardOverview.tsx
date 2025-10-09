import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Calendar, TrendingUp, DollarSign, Phone, BarChart, Target, Clock } from 'lucide-react';
import { LeadConversionChart } from './LeadConversionChart';
import { RevenueChart } from './RevenueChart';
import { ActivityFeed } from './ActivityFeed';
import { ConversationVolumeChart } from './ConversationVolumeChart';

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  totalAppointments: number;
  upcomingAppointments: number;
  totalConversations: number;
  avgLeadScore: number;
  conversionRate: number;
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    convertedLeads: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
    totalConversations: 0,
    avgLeadScore: 0,
    conversionRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();

    // Set up real-time subscriptions
    const leadsChannel = supabase
      .channel('dashboard-leads-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, fetchStats)
      .subscribe();

    const appointmentsChannel = supabase
      .channel('dashboard-appointments-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, fetchStats)
      .subscribe();

    const conversationsChannel = supabase
      .channel('dashboard-conversations-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, fetchStats)
      .subscribe();

    return () => {
      supabase.removeChannel(leadsChannel);
      supabase.removeChannel(appointmentsChannel);
      supabase.removeChannel(conversationsChannel);
    };
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);

    // Fetch leads data
    const { data: leads } = await supabase.from('leads').select('status, ai_score');
    
    const totalLeads = leads?.length || 0;
    const newLeads = leads?.filter(l => l.status === 'new').length || 0;
    const qualifiedLeads = leads?.filter(l => l.status === 'qualified').length || 0;
    const convertedLeads = leads?.filter(l => l.status === 'closed_won').length || 0;
    
    const aiScores = leads?.map(l => l.ai_score).filter(Boolean) as number[];
    const avgLeadScore = aiScores.length > 0 
      ? Math.round(aiScores.reduce((a, b) => a + b, 0) / aiScores.length) 
      : 0;

    const conversionRate = totalLeads > 0 
      ? Math.round((convertedLeads / totalLeads) * 100) 
      : 0;

    // Fetch appointments data
    const { data: appointments } = await supabase.from('appointments').select('start_time, status');
    const totalAppointments = appointments?.length || 0;
    const upcomingAppointments = appointments?.filter(a => {
      const startTime = new Date(a.start_time);
      return startTime > new Date() && a.status === 'scheduled';
    }).length || 0;

    // Fetch conversations data
    const { data: conversations } = await supabase.from('conversations').select('id');
    const totalConversations = conversations?.length || 0;

    setStats({
      totalLeads,
      newLeads,
      qualifiedLeads,
      convertedLeads,
      totalAppointments,
      upcomingAppointments,
      totalConversations,
      avgLeadScore,
      conversionRate,
    });

    setIsLoading(false);
  };

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      change: `${stats.newLeads} new`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Qualified Leads',
      value: stats.qualifiedLeads,
      change: `${stats.conversionRate}% conversion`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Appointments',
      value: stats.totalAppointments,
      change: `${stats.upcomingAppointments} upcoming`,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: 'Conversations',
      value: stats.totalConversations,
      change: 'AI powered calls',
      icon: Phone,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
      title: 'Avg Lead Score',
      value: stats.avgLeadScore,
      change: 'AI scored',
      icon: BarChart,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    },
    {
      title: 'Converted',
      value: stats.convertedLeads,
      change: `${stats.conversionRate}% rate`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted animate-pulse rounded w-24" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded w-16 mb-2" />
              <div className="h-3 bg-muted animate-pulse rounded w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <LeadConversionChart />
        <RevenueChart />
      </div>

      {/* Conversation Analytics */}
      <ConversationVolumeChart />

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}