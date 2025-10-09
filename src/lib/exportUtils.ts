import { format } from 'date-fns';

export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportLeadsToCSV = (leads: any[]) => {
  const exportData = leads.map(lead => ({
    Name: lead.name || '',
    Email: lead.email || '',
    Phone: lead.phone || '',
    Company: lead.company || '',
    Status: lead.status || '',
    'AI Score': lead.ai_score || '',
    Source: lead.source || '',
    'Created At': lead.created_at ? format(new Date(lead.created_at), 'yyyy-MM-dd HH:mm') : '',
    Notes: lead.notes || '',
  }));

  exportToCSV(exportData, 'leads_export');
};

export const exportConversationsToCSV = (conversations: any[]) => {
  const exportData = conversations.map(conv => ({
    'Lead Name': conv.leads?.name || '',
    'Lead Email': conv.leads?.email || '',
    'Call Type': conv.call_type || '',
    'Duration (seconds)': conv.duration_seconds || '',
    'Created At': conv.created_at ? format(new Date(conv.created_at), 'yyyy-MM-dd HH:mm') : '',
    Transcript: conv.transcript ? conv.transcript.replace(/\n/g, ' ') : '',
    Sentiment: conv.metadata?.analysis?.sentiment || '',
    Intent: conv.metadata?.analysis?.intent || '',
  }));

  exportToCSV(exportData, 'conversations_export');
};