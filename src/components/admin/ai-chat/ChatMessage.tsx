import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from './MarkdownComponents';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  if (role === 'user') {
    return (
      <div className="flex flex-col items-end gap-1 animate-fade-in">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
          {content}
        </div>
        {timestamp && (
          <span className="text-[10px] text-muted-foreground/50 px-1">{timeAgo(timestamp)}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-7 h-7 rounded-full bg-accent-emerald/10 flex items-center justify-center mt-0.5">
          <Sparkles className="h-3.5 w-3.5 text-accent-emerald" />
        </div>
        <div className="max-w-[90%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-card border border-border/50 shadow-sm border-l-2 border-l-accent-emerald/40">
          <div className="ai-prose max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
      {timestamp && (
        <span className="text-[10px] text-muted-foreground/50 pl-10">{timeAgo(timestamp)}</span>
      )}
    </div>
  );
}
