import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { formatDistanceToNow, format, subDays, startOfDay } from 'date-fns';

export function ConversationVolumeChart() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('conversation-volume-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'conversations' }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    const { data: conversations } = await supabase
      .from('conversations')
      .select('created_at, duration_seconds')
      .order('created_at', { ascending: true });

    // Group conversations by day for last 30 days
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = startOfDay(subDays(new Date(), 29 - i));
      return {
        date: format(date, 'yyyy-MM-dd'),
        count: 0,
        totalDuration: 0,
      };
    });

    conversations?.forEach((conv) => {
      const convDate = format(startOfDay(new Date(conv.created_at)), 'yyyy-MM-dd');
      const dayData = last30Days.find(d => d.date === convDate);
      if (dayData) {
        dayData.count++;
        dayData.totalDuration += conv.duration_seconds || 0;
      }
    });

    const chartData = last30Days.map(day => ({
      date: format(new Date(day.date), 'MMM dd'),
      conversations: day.count,
      avgDuration: day.count > 0 ? Math.round(day.totalDuration / day.count / 60) : 0,
    }));

    setData(chartData);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Volume</CardTitle>
        <CardDescription>Daily AI conversation activity (Last 30 days)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            conversations: {
              label: 'Conversations',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="conversationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                interval="preserveStartEnd"
              />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="conversations" 
                stroke="hsl(var(--chart-1))" 
                fillOpacity={1}
                fill="url(#conversationGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}