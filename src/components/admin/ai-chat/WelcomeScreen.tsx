import { Sparkles, Users, BarChart3, Mail, Calendar } from 'lucide-react';

interface Suggestion {
  icon: typeof Users;
  label: string;
  message: string;
  color: string;
}

const SUGGESTIONS: Suggestion[] = [
  { icon: Users, label: 'Show new leads this week', message: 'How many new leads came in this week? Give me a summary.', color: 'bg-accent-blue/10 text-accent-blue' },
  { icon: BarChart3, label: 'Pipeline overview', message: "What's our current pipeline value and lead distribution by status?", color: 'bg-accent-emerald/10 text-accent-emerald' },
  { icon: Mail, label: 'Draft a campaign', message: 'Draft a follow-up email campaign for all leads in the nurturing stage.', color: 'bg-accent-purple/10 text-accent-purple' },
  { icon: Calendar, label: 'Upcoming appointments', message: 'Show me all upcoming appointments and which leads they belong to.', color: 'bg-orange-500/10 text-orange-500' },
];

interface WelcomeScreenProps {
  onSend: (message: string) => void;
}

export function WelcomeScreen({ onSend }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12 space-y-8">
      {/* Glow ring icon */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-accent-emerald/20 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="relative p-5 rounded-full bg-gradient-to-br from-accent-emerald/10 to-accent-blue/10 border border-border/50">
          <Sparkles className="h-10 w-10 text-accent-emerald" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground via-accent-emerald to-accent-blue bg-clip-text text-transparent">
          Horizon AI
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Ask questions, take actions, get insights — all in natural language
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onSend(s.message)}
            className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:border-border hover:bg-muted/50 text-left transition-all duration-200 text-sm group"
          >
            <div className={`p-2 rounded-lg ${s.color} shrink-0 transition-transform group-hover:scale-110`}>
              <s.icon className="h-4 w-4" />
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
