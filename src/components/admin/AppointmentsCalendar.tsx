import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Plus, Trash2, CheckCircle, XCircle, Edit2, Loader2, User } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { toast } from 'sonner';

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  status: string;
  lead_id: string | null;
  google_event_id: string | null;
  lead_name?: string;
}

interface AppointmentsCalendarProps {
  onCreateAppointment: () => void;
}

export function AppointmentsCalendar({ onCreateAppointment }: AppointmentsCalendarProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', status: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAppointments();

    const channel = supabase
      .channel('calendar-appointments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, fetchAppointments)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentMonth]);

  const fetchAppointments = async () => {
    setIsLoading(true);
    
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    const { data } = await supabase
      .from('appointments')
      .select('*, leads(name)')
      .gte('start_time', start.toISOString())
      .lte('start_time', end.toISOString())
      .order('start_time', { ascending: true });

    if (data) {
      setAppointments(data.map((a: any) => ({
        ...a,
        lead_name: a.leads?.name || null,
      })));
    }
    
    setIsLoading(false);
  };

  const handleQuickAction = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
    if (error) {
      toast.error('Failed to update appointment');
    } else {
      toast.success(`Marked as ${newStatus}`);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete appointment');
    } else {
      toast.success('Appointment deleted');
    }
  };

  const handleEditSave = async () => {
    if (!editingAppointment) return;
    setIsSaving(true);
    const { error } = await supabase.from('appointments').update({
      title: editForm.title,
      description: editForm.description || null,
      status: editForm.status,
    }).eq('id', editingAppointment.id);
    setIsSaving(false);
    if (error) {
      toast.error('Failed to update');
    } else {
      toast.success('Appointment updated');
      setEditingAppointment(null);
    }
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const appointmentsForSelectedDate = appointments.filter((apt) =>
    isSameDay(new Date(apt.start_time), selectedDate)
  );

  const getAppointmentsForDay = (day: Date) =>
    appointments.filter((apt) => isSameDay(new Date(apt.start_time), day));

  const statusColors: Record<string, string> = {
    scheduled: 'bg-blue-500',
    completed: 'bg-green-500',
    cancelled: 'bg-red-500',
    no_show: 'bg-gray-500',
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Calendar */}
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Appointments Calendar</CardTitle>
              <CardDescription>{format(currentMonth, 'MMMM yyyy')}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>Today</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>Next</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[400px] flex items-center justify-center">
              <div className="text-muted-foreground">Loading calendar...</div>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">{day}</div>
              ))}
              {daysInMonth.map((day) => {
                const dayAppointments = getAppointmentsForDay(day);
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`relative p-2 text-sm rounded-lg border transition-colors
                      ${isSelected ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted border-transparent'}
                      ${isTodayDate && !isSelected ? 'border-primary' : ''}
                    `}
                  >
                    <div className="font-medium">{format(day, 'd')}</div>
                    {dayAppointments.length > 0 && (
                      <div className="flex gap-1 mt-1 justify-center">
                        {dayAppointments.slice(0, 3).map((apt) => (
                          <div key={apt.id} className={`w-1.5 h-1.5 rounded-full ${statusColors[apt.status] || 'bg-gray-400'}`} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
              <CardDescription>{appointmentsForSelectedDate.length} appointments</CardDescription>
            </div>
            <Button size="sm" onClick={onCreateAppointment}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {appointmentsForSelectedDate.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No appointments</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={onCreateAppointment}>Schedule one</Button>
              </div>
            ) : (
              <div className="space-y-3">
                {appointmentsForSelectedDate.map((apt) => (
                  <div key={apt.id} className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{apt.title}</h4>
                      <Badge variant={apt.status === 'completed' ? 'default' : 'outline'}>{apt.status}</Badge>
                    </div>
                    {apt.lead_name && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <User className="h-3 w-3" />
                        <span>{apt.lead_name}</span>
                      </div>
                    )}
                    {apt.description && <p className="text-sm text-muted-foreground mb-2">{apt.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(apt.start_time), 'h:mm a')} - {format(new Date(apt.end_time), 'h:mm a')}
                      </span>
                    </div>
                    {/* Quick actions */}
                    <div className="flex gap-1.5 flex-wrap">
                      {apt.status === 'scheduled' && (
                        <>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={(e) => { e.stopPropagation(); handleQuickAction(apt.id, 'completed'); }}>
                            <CheckCircle className="h-3 w-3 mr-1" /> Complete
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={(e) => { e.stopPropagation(); handleQuickAction(apt.id, 'no_show'); }}>
                            <XCircle className="h-3 w-3 mr-1" /> No-Show
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={(e) => { e.stopPropagation(); setEditingAppointment(apt); setEditForm({ title: apt.title, description: apt.description || '', status: apt.status }); }}>
                        <Edit2 className="h-3 w-3 mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(apt.id); }}>
                        <Trash2 className="h-3 w-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingAppointment} onOpenChange={() => setEditingAppointment(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Appointment</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={editForm.status} onValueChange={(val) => setEditForm({ ...editForm, status: val })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingAppointment(null)}>Cancel</Button>
              <Button onClick={handleEditSave} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
