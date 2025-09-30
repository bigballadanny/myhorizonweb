import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Calendar, Settings, BarChart3, Loader2, Users, Plus } from 'lucide-react';
import { CreateLeadDialog } from '@/components/admin/CreateLeadDialog';
import { CreateAppointmentDialog } from '@/components/admin/CreateAppointmentDialog';
import { LeadDetailDialog } from '@/components/admin/LeadDetailDialog';
import { LeadPipelineBoard } from '@/components/admin/LeadPipelineBoard';
import { IntegrationsSettings } from '@/components/admin/IntegrationsSettings';
import { UserManagement } from '@/components/admin/UserManagement';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';

export default function Admin() {
  const [showCreateLead, setShowCreateLead] = useState(false);
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, adminUser, signOut, isSuperAdmin } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">MyHorizon Admin</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-muted-foreground">
                  {adminUser?.email}
                </p>
                <Badge variant={adminUser?.role === 'super_admin' ? 'destructive' : 'default'}>
                  {adminUser?.role?.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="pipeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pipeline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              Appointments
            </TabsTrigger>
            {isSuperAdmin && (
              <TabsTrigger value="users">
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
            )}
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Lead Pipeline</h2>
                <p className="text-muted-foreground">Visual overview of your sales pipeline</p>
              </div>
              <Button onClick={() => setShowCreateLead(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Lead
              </Button>
            </div>
            <LeadPipelineBoard 
              onLeadClick={(lead) => {
                setSelectedLead(lead);
                setShowLeadDetail(true);
              }}
            />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Appointments</h2>
                <p className="text-muted-foreground">Manage scheduled appointments</p>
              </div>
              <Button onClick={() => setShowCreateAppointment(true)}>
                <Calendar className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>View and manage your scheduled meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Appointment calendar coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {isSuperAdmin && (
            <TabsContent value="users" className="space-y-4">
              <UserManagement />
            </TabsContent>
          )}

          <TabsContent value="settings" className="space-y-4">
            <IntegrationsSettings />
          </TabsContent>
        </Tabs>
      </main>

      <CreateLeadDialog
        open={showCreateLead}
        onClose={() => setShowCreateLead(false)}
        onSuccess={() => setShowCreateLead(false)}
      />

      <CreateAppointmentDialog
        open={showCreateAppointment}
        onClose={() => setShowCreateAppointment(false)}
        onSuccess={() => setShowCreateAppointment(false)}
      />

      <LeadDetailDialog
        lead={selectedLead}
        open={showLeadDetail}
        onClose={() => {
          setShowLeadDetail(false);
          setSelectedLead(null);
        }}
        onUpdate={() => {
          setShowLeadDetail(false);
          setSelectedLead(null);
        }}
      />
    </div>
  );
}
