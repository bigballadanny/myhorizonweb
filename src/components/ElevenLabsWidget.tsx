import { useConversation } from '@elevenlabs/react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, X, Loader2, Mic, MicOff, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { captureLead } from '@/lib/lead-capture';

const DEFAULT_AGENT_ID = 'agent_8801khq4sqbseqxa56493s1j7anz';

export interface ElevenLabsWidgetProps {
  agentId?: string;
  accentColor?: string;
  industryName?: string;
  openingMessage?: string;
  hasStickyMobileCTA?: boolean;
}

interface ChatMessage {
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

interface ConversationData {
  transcripts: ChatMessage[];
  startTime: Date | null;
  endTime: Date | null;
}

export function ElevenLabsWidget({
  agentId,
  accentColor,
  industryName,
  openingMessage,
  hasStickyMobileCTA = false,
}: ElevenLabsWidgetProps = {}) {
  const AGENT_ID = agentId || DEFAULT_AGENT_ID;
  const accent = accentColor || '#2563eb';
  const displayName = industryName ? `${industryName} AI` : 'MyHorizon AI';
  const defaultOpening = openingMessage ||
    "Hi! I'm MyHorizon's AI consultant. I can help you understand how AI automation could work for your business. Ask me anything or tap the mic to talk!";

  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'agent',
      text: defaultOpening,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationDataRef = useRef<ConversationData>({
    transcripts: [],
    startTime: null,
    endTime: null,
  });

  const conversation = useConversation({
    onConnect: () => {
      conversationDataRef.current.startTime = new Date();
      conversationDataRef.current.transcripts = [];
      setError(null);
    },
    onDisconnect: async () => {
      conversationDataRef.current.endTime = new Date();
      setIsVoiceMode(false);
      const convId = await saveConversation();
      if (convId) processConversation(convId);
    },
    onMessage: (message) => {
      const msg = message as unknown as {
        type?: string;
        user_transcription_event?: { user_transcript: string };
        agent_response_event?: { agent_response: string };
      };

      if (msg.type === 'user_transcript' && msg.user_transcription_event) {
        const chatMsg: ChatMessage = {
          role: 'user',
          text: msg.user_transcription_event.user_transcript,
          timestamp: new Date(),
        };
        conversationDataRef.current.transcripts.push(chatMsg);
        setMessages((prev) => [...prev, chatMsg]);
      }

      if (msg.type === 'agent_response' && msg.agent_response_event) {
        const chatMsg: ChatMessage = {
          role: 'agent',
          text: msg.agent_response_event.agent_response,
          timestamp: new Date(),
        };
        conversationDataRef.current.transcripts.push(chatMsg);
        setMessages((prev) => [...prev, chatMsg]);
      }
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      setError('Connection error. Please try again.');
      setIsConnecting(false);
      setIsVoiceMode(false);
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && !isVoiceMode) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isVoiceMode]);

  // Hide tooltip
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const processConversation = async (conversationId: string) => {
    try {
      await supabase.functions.invoke('process-conversation', {
        body: { conversation_id: conversationId },
      });
    } catch (err) {
      console.error('Failed to process conversation:', err);
    }
  };

  const saveConversation = async (): Promise<string | null> => {
    const data = conversationDataRef.current;
    if (data.transcripts.length === 0) return null;

    try {
      const formattedTranscript = data.transcripts
        .map((t) => `${t.role}: ${t.text}`)
        .join('\n');

      const durationSeconds =
        data.startTime && data.endTime
          ? Math.floor((data.endTime.getTime() - data.startTime.getTime()) / 1000)
          : null;

      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .insert({
          agent_id: AGENT_ID,
          transcript: formattedTranscript,
          duration_seconds: durationSeconds,
          call_type: 'inbound',
          metadata: {
            source: 'react_sdk',
            mode: 'voice',
            page_url: window.location.href,
            captured_at: new Date().toISOString(),
          },
        })
        .select()
        .single();

      if (convError) {
        console.error('Error saving conversation:', convError);
        return null;
      }
      return convData?.id || null;
    } catch (err) {
      console.error('Failed to save conversation:', err);
      return null;
    }
  };

  const startVoice = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const { data, error: fnError } = await supabase.functions.invoke(
        'elevenlabs-conversation-token'
      );

      if (fnError) throw new Error(fnError.message || 'Failed to get conversation token');

      if (data?.signed_url) {
        await conversation.startSession({ signedUrl: data.signed_url });
      } else {
        await conversation.startSession({
          agentId: data?.agent_id || AGENT_ID,
          connectionType: 'webrtc',
        });
      }
      setIsVoiceMode(true);
    } catch (err) {
      console.error('Failed to start voice:', err);
      setError(err instanceof Error ? err.message : 'Failed to start voice');
    } finally {
      setIsConnecting(false);
    }
  }, [conversation]);

  const endVoice = useCallback(async () => {
    await conversation.endSession();
    setIsVoiceMode(false);
  }, [conversation]);

  // Text chat — call the ElevenLabs agent via edge function or direct API
  const sendTextMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: inputText.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Check for email in message for lead capture
    const emailMatch = inputText.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      captureLead({
        email: emailMatch[0],
        source: 'chat_widget',
        notes: `Provided email via chat: "${inputText.trim()}"`,
      });
    }

    try {
      // Use Supabase edge function to proxy to ElevenLabs text API
      const { data, error: fnError } = await supabase.functions.invoke(
        'elevenlabs-text-chat',
        {
          body: {
            agent_id: AGENT_ID,
            message: inputText.trim(),
            conversation_history: messages
              .slice(-10)
              .map((m) => ({ role: m.role, text: m.text })),
          },
        }
      );

      if (fnError || !data?.response) {
        // Fallback — smart pattern-matched responses
        const response = getFallbackResponse(inputText.trim());
        setMessages((prev) => [
          ...prev,
          { role: 'agent', text: response, timestamp: new Date() },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'agent', text: data.response, timestamp: new Date() },
        ]);
      }
    } catch {
      // Fallback response
      const response = getFallbackResponse(inputText.trim());
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: response, timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;

  return (
    <div
      className={`fixed right-4 sm:right-6 z-[110] transition-all duration-300 ${
        hasStickyMobileCTA ? 'bottom-24 sm:bottom-6' : 'bottom-4 sm:bottom-6'
      }`}
    >
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-20 right-0 w-[340px] sm:w-[380px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div
              className="text-white px-4 py-3 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent}99)` }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                <span className="font-medium text-sm">{displayName}</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Voice toggle */}
                <button
                  onClick={isConnected ? endVoice : startVoice}
                  disabled={isConnecting}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isConnected
                      ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                      : 'hover:bg-white/10 text-background/70'
                  }`}
                  title={isConnected ? 'End voice call' : 'Start voice call'}
                >
                  {isConnecting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isConnected ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-background/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Voice status bar */}
            <AnimatePresence>
              {isConnected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-accent-blue/10 border-b border-border px-4 py-2 flex items-center gap-2"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isSpeaking ? 'bg-accent-blue animate-pulse' : 'bg-muted-foreground'
                    }`}
                  />
                  <span className="text-xs font-medium text-foreground">
                    {isSpeaking ? 'AI is speaking...' : 'Listening...'}
                  </span>
                  <button
                    onClick={endVoice}
                    className="ml-auto text-xs text-destructive hover:underline"
                  >
                    End call
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="h-[320px] overflow-hidden p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent-blue text-white rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-3.5 py-2.5 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 pb-2">
                <div className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-1.5">
                  {error}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  disabled={isTyping}
                  className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/40 disabled:opacity-50"
                />
                <button
                  onClick={sendTextMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-accent-blue text-white hover:bg-accent-blue/90 disabled:opacity-30 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
          >
            <div className="bg-foreground text-background px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
              Chat with us
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-foreground rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4"
        style={{ backgroundColor: isOpen ? '#18181b' : accent }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-7 h-7 text-background" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: `${accent}60` }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Unread indicator */}
        {!isOpen && messages.length > 1 && (
          <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-background" />
        )}
      </motion.button>
    </div>
  );
}

/** Fallback responses when edge function unavailable */
function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.match(/med\s*spa|aestheti|botox|facial|skin|beauty/i)) {
    return "AI automation is transforming med spas — from intelligent appointment scheduling to personalized follow-up sequences that boost rebooking rates by 40-60%. Want to see how it would work for your practice? Book a free strategy call and we'll map it out for you.";
  }

  if (lower.match(/construct|contract|build|plumb|hvac|electric|roof/i)) {
    return "Construction and trades businesses are using AI to automate bid follow-ups, schedule crews, and manage client communication. One contractor we worked with saved 15 hours per week on admin alone. Want to explore what's possible for your business?";
  }

  if (lower.match(/cost|price|how much|pric/i)) {
    return "We start with a free consultation where we map out your specific automation opportunities. Every business is different, so we tailor solutions to your needs. Book a call and we'll show you exactly what's possible — no obligation.";
  }

  if (lower.match(/what do you|what can|how does|tell me|explain/i)) {
    return "We build custom AI systems that handle the repetitive work in your business — scheduling, follow-ups, lead management, client communication — so you can focus on growing. Think of it as a digital employee that works 24/7. What industry are you in? I can give you specific examples.";
  }

  if (lower.match(/hello|hi|hey|sup|what'?s up/i)) {
    return "Hey! Welcome to MyHorizon. I'm here to help you understand how AI could automate parts of your business. What kind of business do you run?";
  }

  if (lower.match(/book|call|consultation|schedule|meet/i)) {
    return "Great! You can book a free strategy session right on this page — just scroll down to the contact section, or I can walk you through what to expect on the call. It's 15-20 minutes where we map out your top automation opportunities.";
  }

  if (lower.match(/email|contact|reach|phone/i)) {
    return "You can reach us at daniel@myhorizon.ai, or book a free consultation directly on this page. What questions can I help with in the meantime?";
  }

  return "That's a great question! We specialize in helping business owners automate their operations with AI — everything from client communication to scheduling to lead management. Would you like to tell me about your business so I can give you specific recommendations?";
}
