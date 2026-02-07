import { Sparkles } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="shrink-0 w-7 h-7 rounded-full bg-accent-emerald/10 flex items-center justify-center mt-0.5">
        <Sparkles className="h-3.5 w-3.5 text-accent-emerald" />
      </div>
      <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 border-l-2 border-l-accent-emerald/40">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60"
              style={{
                animation: 'ai-bounce 0.6s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
