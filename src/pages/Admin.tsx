import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, Users, MessageSquare, Calendar, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('admin_authenticated');
    if (!isAuth) {
      navigate('/');
      return;
    }

    // Fetch data
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    const [leadsData, conversationsData, appointmentsData] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('conversations').select('*, leads(*)').order('created_at', { ascending: false }),
      supabase.from('appointments').select('*, leads(*)').order('start_time', { ascending: false })
    ]);

    if (leadsData.data) setLeads(leadsData.data);
    if (conversationsData.data) setConversations(conversationsData.data);
    if (appointmentsData.data) setAppointments(appointmentsData.data);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    toast({ title: 'Logged out successfully' });
    navigate('/');
  };

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === 'new').length,
    qualifiedLeads: leads.filter(l => l.status === 'qualified').length,
    appointmentsScheduled: appointments.filter(a => a.status === 'scheduled').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MyHorizon Admin</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads">
              <Users className="w-4 h-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="conversations">
              <MessageSquare className="w-4 h-4 mr-2" />
              Conversations
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalLeads}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.newLeads}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Qualified</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.qualifiedLeads}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.appointmentsScheduled}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest leads and conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{lead.name || 'Anonymous'}</p>
                        <p className="text-sm text-muted-foreground">{lead.email || lead.phone || 'No contact info'}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10">{lead.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Leads</CardTitle>
                <CardDescription>Manage and track all your leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{lead.name || 'Anonymous Lead'}</h3>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                          <p className="text-sm text-muted-foreground">{lead.phone}</p>
                          {lead.company && <p className="text-sm">Company: {lead.company}</p>}
                        </div>
                        <div className="text-right space-y-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10">{lead.status}</span>
                          {lead.ai_score && (
                            <p className="text-sm font-medium">Score: {lead.ai_score}/100</p>
                          )}
                        </div>
                      </div>
                      {lead.notes && (
                        <p className="mt-3 text-sm text-muted-foreground">{lead.notes}</p>
                      )}
                      <p className="mt-2 text-xs text-muted-foreground">
                        Created: {new Date(lead.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversation Transcripts</CardTitle>
                <CardDescription>All ElevenLabs AI conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversations.map((conv) => (
                    <div key={conv.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">
                            {conv.leads?.name || 'Anonymous'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(conv.created_at).toLocaleString()}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10">
                          {conv.call_type}
                        </span>
                      </div>
                      {conv.transcript && (
                        <div className="mt-3 p-3 bg-muted rounded text-sm whitespace-pre-wrap">
                          {conv.transcript}
                        </div>
                      )}
                      {conv.duration_seconds && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Duration: {Math.floor(conv.duration_seconds / 60)}m {conv.duration_seconds % 60}s
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Scheduled calls and meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{apt.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {apt.leads?.name || 'No lead assigned'}
                          </p>
                          <p className="text-sm">
                            {new Date(apt.start_time).toLocaleString()}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10">
                          {apt.status}
                        </span>
                      </div>
                      {apt.description && (
                        <p className="mt-3 text-sm text-muted-foreground">{apt.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your admin panel</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
