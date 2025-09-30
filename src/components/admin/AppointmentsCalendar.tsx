import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, User, MapPin, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isFuture } from 'date-fns';

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  status: string;
  lead_id: string | null;
  google_event_id: string | null;
}

interface AppointmentsCalendarProps {
  onCreateAppointment: () => void;
}

export function AppointmentsCalendar({ onCreateAppointment }: AppointmentsCalendarProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();

    // Real-time subscription
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
      .select('*')
      .gte('start_time', start.toISOString())
      .lte('start_time', end.toISOString())
      .order('start_time', { ascending: true });

    if (data) {
      setAppointments(data);
    }
    
    setIsLoading(false);
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const appointmentsForSelectedDate = appointments.filter((apt) =>
    isSameDay(new Date(apt.start_time), selectedDate)
  );

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter((apt) => isSameDay(new Date(apt.start_time), day));
  };

  const statusColors: { [key: string]: string } = {
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
              >
                Next
              </Button>
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
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
              {daysInMonth.map((day) => {
                const dayAppointments = getAppointmentsForDay(day);
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      relative p-2 text-sm rounded-lg border transition-colors
                      ${isSelected ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted border-transparent'}
                      ${isTodayDate && !isSelected ? 'border-primary' : ''}
                      ${!isSameDay(day, currentMonth) ? 'text-muted-foreground' : ''}
                    `}
                  >
                    <div className="font-medium">{format(day, 'd')}</div>
                    {dayAppointments.length > 0 && (
                      <div className="flex gap-1 mt-1 justify-center">
                        {dayAppointments.slice(0, 3).map((apt) => (
                          <div
                            key={apt.id}
                            className={`w-1.5 h-1.5 rounded-full ${statusColors[apt.status] || 'bg-gray-400'}`}
                          />
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
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {appointmentsForSelectedDate.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No appointments</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={onCreateAppointment}
                >
                  Schedule one
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {appointmentsForSelectedDate.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{apt.title}</h4>
                      <Badge variant={apt.status === 'completed' ? 'default' : 'outline'}>
                        {apt.status}
                      </Badge>
                    </div>
                    {apt.description && (
                      <p className="text-sm text-muted-foreground mb-2">{apt.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(apt.start_time), 'h:mm a')} - {format(new Date(apt.end_time), 'h:mm a')}
                      </span>
                      {apt.google_event_id && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Google Calendar
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}