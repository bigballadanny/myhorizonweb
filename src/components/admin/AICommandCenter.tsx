import { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Trash2 } from 'lucide-react';
import { ChatMessage } from './ai-chat/ChatMessage';
import { TypingIndicator } from './ai-chat/TypingIndicator';
import { WelcomeScreen } from './ai-chat/WelcomeScreen';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AICommandCenter({ embedded }: { embedded?: boolean } = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text.trim(), timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';
    const assistantTimestamp = new Date();

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
        }
        return [...prev, { role: 'assistant', content: assistantContent, timestamp: assistantTimestamp }];
      });
    };

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-ai-assistant`;
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `Error ${resp.status}`);
      }

      const contentType = resp.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream') && resp.body) {
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);
            if (line.endsWith('\r')) line = line.slice(0, -1);
            if (line.startsWith(':') || line.trim() === '') continue;
            if (!line.startsWith('data: ')) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) updateAssistant(content);
            } catch {
              buffer = line + '\n' + buffer;
              break;
            }
          }
        }

        if (buffer.trim()) {
          for (const raw of buffer.split('\n')) {
            if (!raw || !raw.startsWith('data: ')) continue;
            const jsonStr = raw.slice(6).trim();
            if (jsonStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) updateAssistant(content);
            } catch { /* ignore */ }
          }
        }
      } else {
        const data = await resp.json();
        const content = data.choices?.[0]?.message?.content || data.content || 'I processed your request but have no additional response.';
        updateAssistant(content);
      }
    } catch (e) {
      console.error('AI assistant error:', e);
      updateAssistant(`Sorry, I encountered an error: ${e instanceof Error ? e.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return (
    <div className={`flex flex-col ${embedded ? 'h-full' : 'h-[calc(100vh-200px)] max-h-[800px]'}`}>
      {/* Header - hidden in embedded mode */}
      {!embedded && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent-emerald/10 to-accent-blue/10 border border-border/50">
              <Sparkles className="h-5 w-5 text-accent-emerald" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Horizon AI</h2>
              <p className="text-xs text-muted-foreground">Your intelligent CRM assistant</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setMessages([])}>
              <Trash2 className="h-4 w-4 mr-1" /> Clear
            </Button>
          )}
        </div>
      )}

      {/* Chat Area */}
      <Card className="flex-1 overflow-hidden border-border/50">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <WelcomeScreen onSend={sendMessage} />
          ) : (
            <div className="space-y-5 pb-4">
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} timestamp={msg.timestamp} />
              ))}
              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <TypingIndicator />
              )}
            </div>
          )}
        </ScrollArea>
      </Card>

      {/* Input */}
      <div className="flex gap-2 mt-3 relative">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          placeholder="Ask Horizon AI anything..."
          disabled={isLoading}
          className="flex-1 rounded-full pl-5 pr-4 h-11 border-border/50 focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald/40 transition-all"
        />
        <Button
          onClick={() => sendMessage(input)}
          disabled={isLoading || !input.trim()}
          size="icon"
          className="h-11 w-11 rounded-full bg-gradient-to-r from-accent-emerald to-accent-blue hover:opacity-90 text-white shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-[10px] text-muted-foreground/40 text-center mt-1.5">Shift+Enter for new line</p>
    </div>
  );
}
