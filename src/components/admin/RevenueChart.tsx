import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function RevenueChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: leads } = await supabase
      .from('leads')
      .select('created_at, status')
      .order('created_at', { ascending: true });

    // Group leads by month
    const monthlyData: { [key: string]: { total: number; converted: number } } = {};

    leads?.forEach((lead) => {
      const date = new Date(lead.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { total: 0, converted: 0 };
      }

      monthlyData[monthKey].total++;
      if (lead.status === 'closed_won') {
        monthlyData[monthKey].converted++;
      }
    });

    const chartData = Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        total: data.total,
        converted: data.converted,
        conversionRate: data.total > 0 ? Math.round((data.converted / data.total) * 100) : 0,
      }))
      .slice(-6); // Last 6 months

    setData(chartData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Trends</CardTitle>
        <CardDescription>Monthly lead volume and conversion</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: 'Total Leads',
              color: 'hsl(var(--chart-1))',
            },
            converted: {
              label: 'Converted',
              color: 'hsl(var(--success))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                tickFormatter={(value) => {
                  const [year, month] = value.split('-');
                  return `${month}/${year.slice(2)}`;
                }}
              />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-1))' }}
              />
              <Line 
                type="monotone" 
                dataKey="converted" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--success))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}