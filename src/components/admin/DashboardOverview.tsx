import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Calendar, TrendingUp, Phone, BarChart, Target, DollarSign, Eye } from 'lucide-react';
import { LeadConversionChart } from './LeadConversionChart';
import { RevenueChart } from './RevenueChart';
import { ActivityFeed } from './ActivityFeed';
import { ConversationVolumeChart } from './ConversationVolumeChart';
import { QuickActions } from './QuickActions';
import { subDays, isAfter } from 'date-fns';

const STAGE_VALUES: Record<string, number> = {
  new: 500, contacted: 1000, qualified: 2000, nurturing: 1500,
  appointment_scheduled: 3500, closed_won: 5000, closed_lost: 0,
};

interface DashboardStats {
  totalLeads: number; newLeads: number; qualifiedLeads: number; convertedLeads: number;
  totalAppointments: number; upcomingAppointments: number; totalConversations: number;
  avgLeadScore: number; conversionRate: number; pipelineValue: number;
  weekLeads: number; lastWeekLeads: number;
  weekAppointments: number; lastWeekAppointments: number;
  weekConversations: number; lastWeekConversations: number;
  uniqueVisitors: number; returningVisitors: number;
}

export function DashboardOverview({ onNewLead, onNavigateCampaigns }: { onNewLead?: () => void; onNavigateCampaigns?: () => void }) {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0, newLeads: 0, qualifiedLeads: 0, convertedLeads: 0,
    totalAppointments: 0, upcomingAppointments: 0, totalConversations: 0,
    avgLeadScore: 0, conversionRate: 0, pipelineValue: 0,
    weekLeads: 0, lastWeekLeads: 0, weekAppointments: 0, lastWeekAppointments: 0,
    weekConversations: 0, lastWeekConversations: 0, uniqueVisitors: 0, returningVisitors: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const leadsChannel = supabase.channel('dashboard-leads-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, fetchStats).subscribe();
    const appointmentsChannel = supabase.channel('dashboard-appointments-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, fetchStats).subscribe();
    const conversationsChannel = supabase.channel('dashboard-conversations-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, fetchStats).subscribe();
    return () => { supabase.removeChannel(leadsChannel); supabase.removeChannel(appointmentsChannel); supabase.removeChannel(conversationsChannel); };
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    const now = new Date();
    const weekAgo = subDays(now, 7);
    const twoWeeksAgo = subDays(now, 14);

    const { data: leads } = await supabase.from('leads').select('status, ai_score, created_at');
    const { data: appointments } = await supabase.from('appointments').select('start_time, status, created_at');
    const { data: conversations } = await supabase.from('conversations').select('id, created_at');
    const { data: visitors } = await supabase.from('visitor_sessions').select('fingerprint_hash, is_returning, visit_count, session_duration_seconds, pages_viewed, last_seen_at');

    const totalLeads = leads?.length || 0;
    const newLeads = leads?.filter(l => l.status === 'new').length || 0;
    const qualifiedLeads = leads?.filter(l => l.status === 'qualified').length || 0;
    const convertedLeads = leads?.filter(l => l.status === 'closed_won').length || 0;
    const aiScores = leads?.map(l => l.ai_score).filter(Boolean) as number[];
    const avgLeadScore = aiScores.length > 0 ? Math.round(aiScores.reduce((a, b) => a + b, 0) / aiScores.length) : 0;
    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
    const pipelineValue = leads?.reduce((sum, l) => sum + (STAGE_VALUES[l.status] || 0), 0) || 0;

    const weekLeads = leads?.filter(l => isAfter(new Date(l.created_at), weekAgo)).length || 0;
    const lastWeekLeads = leads?.filter(l => isAfter(new Date(l.created_at), twoWeeksAgo) && !isAfter(new Date(l.created_at), weekAgo)).length || 0;

    const totalAppointments = appointments?.length || 0;
    const upcomingAppointments = appointments?.filter(a => new Date(a.start_time) > now && a.status === 'scheduled').length || 0;
    const weekAppointments = appointments?.filter(a => isAfter(new Date(a.created_at), weekAgo)).length || 0;
    const lastWeekAppointments = appointments?.filter(a => isAfter(new Date(a.created_at), twoWeeksAgo) && !isAfter(new Date(a.created_at), weekAgo)).length || 0;

    const totalConversations = conversations?.length || 0;
    const weekConversations = conversations?.filter(c => isAfter(new Date(c.created_at), weekAgo)).length || 0;
    const lastWeekConversations = conversations?.filter(c => isAfter(new Date(c.created_at), twoWeeksAgo) && !isAfter(new Date(c.created_at), weekAgo)).length || 0;

    const uniqueFingerprints = new Set(visitors?.map(v => v.fingerprint_hash) || []);
    const uniqueVisitors = uniqueFingerprints.size;
    const returningVisitors = visitors?.filter(v => v.is_returning).length || 0;

    setStats({
      totalLeads, newLeads, qualifiedLeads, convertedLeads, totalAppointments, upcomingAppointments,
      totalConversations, avgLeadScore, conversionRate, pipelineValue,
      weekLeads, lastWeekLeads, weekAppointments, lastWeekAppointments, weekConversations, lastWeekConversations,
      uniqueVisitors, returningVisitors,
    });
    setIsLoading(false);
  };

  const getChangeIndicator = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const change = Math.round(((current - previous) / previous) * 100);
    return change >= 0 ? `+${change}%` : `${change}%`;
  };

  const statCards = [
    { title: 'Pipeline Value', value: `$${stats.pipelineValue.toLocaleString()}`, change: `${stats.totalLeads} active leads`, icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-100 dark:bg-emerald-900/20' },
    { title: 'Total Leads', value: stats.totalLeads, change: `${stats.newLeads} new`, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20' },
    { title: 'Qualified Leads', value: stats.qualifiedLeads, change: `${stats.conversionRate}% conversion`, icon: Target, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20' },
    { title: 'Appointments', value: stats.totalAppointments, change: `${stats.upcomingAppointments} upcoming`, icon: Calendar, color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/20' },
    { title: 'Conversations', value: stats.totalConversations, change: 'AI powered calls', icon: Phone, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/20' },
    { title: 'Visitors', value: stats.uniqueVisitors, change: `${stats.returningVisitors} returning`, icon: Eye, color: 'text-cyan-600', bgColor: 'bg-cyan-100 dark:bg-cyan-900/20' },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><div className="h-4 bg-muted animate-pulse rounded w-24" /><div className="h-4 w-4 bg-muted animate-pulse rounded" /></CardHeader><CardContent><div className="h-8 bg-muted animate-pulse rounded w-16 mb-2" /><div className="h-3 bg-muted animate-pulse rounded w-20" /></CardContent></Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <QuickActions onNewLead={onNewLead} onNavigateCampaigns={onNavigateCampaigns} />

      {/* Weekly Comparison */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Leads This Week', current: stats.weekLeads, previous: stats.lastWeekLeads },
          { label: 'Appointments This Week', current: stats.weekAppointments, previous: stats.lastWeekAppointments },
          { label: 'Conversations This Week', current: stats.weekConversations, previous: stats.lastWeekConversations },
        ].map((item) => {
          const change = getChangeIndicator(item.current, item.previous);
          const isPositive = change.startsWith('+');
          return (
            <Card key={item.label}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold">{item.current}</span>
                  <span className={`text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>{change} vs last week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}><stat.icon className={`h-4 w-4 ${stat.color}`} /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>


      <div className="grid gap-4 md:grid-cols-2"><LeadConversionChart /><RevenueChart /></div>
      <ConversationVolumeChart />
      <ActivityFeed />
    </div>
  );
}
