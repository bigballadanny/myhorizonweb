import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function LeadConversionChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: leads } = await supabase.from('leads').select('status');

    const statusCounts = {
      new: 0,
      contacted: 0,
      qualified: 0,
      appointment_scheduled: 0,
      nurturing: 0,
      closed_won: 0,
      closed_lost: 0,
    };

    leads?.forEach((lead) => {
      if (lead.status in statusCounts) {
        statusCounts[lead.status as keyof typeof statusCounts]++;
      }
    });

    const chartData = [
      { name: 'New', value: statusCounts.new, fill: 'hsl(var(--chart-1))' },
      { name: 'Contacted', value: statusCounts.contacted, fill: 'hsl(var(--chart-2))' },
      { name: 'Qualified', value: statusCounts.qualified, fill: 'hsl(var(--chart-3))' },
      { name: 'Scheduled', value: statusCounts.appointment_scheduled, fill: 'hsl(var(--chart-4))' },
      { name: 'Nurturing', value: statusCounts.nurturing, fill: 'hsl(var(--chart-5))' },
      { name: 'Won', value: statusCounts.closed_won, fill: 'hsl(var(--success))' },
      { name: 'Lost', value: statusCounts.closed_lost, fill: 'hsl(var(--destructive))' },
    ];

    setData(chartData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Conversion Funnel</CardTitle>
        <CardDescription>Leads by pipeline stage</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: 'Leads',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}