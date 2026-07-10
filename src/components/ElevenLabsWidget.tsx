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
  initiallyOpen?: boolean;
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

interface ViewportMetrics {
  height: number;
  bottomInset: number;
  keyboardVisible: boolean;
}

export function ElevenLabsWidget({
  agentId,
  accentColor,
  industryName,
  openingMessage,
  hasStickyMobileCTA = false,
  initiallyOpen = false,
}: ElevenLabsWidgetProps = {}) {
  const AGENT_ID = agentId || DEFAULT_AGENT_ID;
  const accent = accentColor || '#2563eb';
  const displayName = industryName ? `${industryName} AI` : 'MyHorizon AI';
  const defaultOpening = openingMessage ||
    "Hi! I'm MyHorizon's AI consultant. I can help you understand how AI automation could work for your business. Ask me anything or tap the mic to talk!";

  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [contactInViewOnMobile, setContactInViewOnMobile] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'agent',
      text: defaultOpening,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [viewportMetrics, setViewportMetrics] = useState<ViewportMetrics | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const fallbackTimeoutRef = useRef<number | null>(null);
  const finalizationPromiseRef = useRef<Promise<void> | null>(null);
  const finalizeConversationRef = useRef<() => Promise<void>>(async () => undefined);
  const conversationModeRef = useRef<'text' | 'voice'>('text');
  const conversationDataRef = useRef<ConversationData>({
    transcripts: [],
    startTime: null,
    endTime: null,
  });
  // Track partial agent responses for streaming text
  const agentResponseBuffer = useRef('');

  const conversation = useConversation({
    onConnect: () => {
      conversationDataRef.current.startTime ??= new Date();
      conversationDataRef.current.endTime = null;
      setIsSessionActive(true);
      setError(null);
    },
    onDisconnect: () => {
      conversationDataRef.current.endTime = new Date();
      if (fallbackTimeoutRef.current !== null) {
        window.clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      setIsSessionActive(false);
      setIsVoiceMode(false);
      setIsTyping(false);
      void finalizeConversationRef.current();
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
        if (fallbackTimeoutRef.current !== null) {
          window.clearTimeout(fallbackTimeoutRef.current);
          fallbackTimeoutRef.current = null;
        }
        const chatMsg: ChatMessage = {
          role: 'agent',
          text: msg.agent_response_event.agent_response,
          timestamp: new Date(),
        };
        conversationDataRef.current.transcripts.push(chatMsg);
        setMessages((prev) => [...prev, chatMsg]);
        setIsTyping(false);
      }
    },
    onAgentChatResponsePart: (event) => {
      // Streaming text response from agent in text mode
      const part = event as unknown as { text?: string; is_final?: boolean };
      if (part.text) {
        agentResponseBuffer.current += part.text;
      }
      if (part.is_final && agentResponseBuffer.current) {
        if (fallbackTimeoutRef.current !== null) {
          window.clearTimeout(fallbackTimeoutRef.current);
          fallbackTimeoutRef.current = null;
        }
        const chatMsg: ChatMessage = {
          role: 'agent',
          text: agentResponseBuffer.current,
          timestamp: new Date(),
        };
        conversationDataRef.current.transcripts.push(chatMsg);
        setMessages((prev) => [...prev, chatMsg]);
        agentResponseBuffer.current = '';
        setIsTyping(false);
      }
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      setError('Connection error. Please try again.');
      setIsConnecting(false);
      setIsVoiceMode(false);
      setIsTyping(false);
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && !isVoiceMode) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 300);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, isVoiceMode]);

  // Handle mobile keyboard
  useEffect(() => {
    if (!isOpen) return;
    const vv = window.visualViewport;
    if (!vv) return;

    const updateViewport = () => {
      const heightDifference = window.innerHeight - vv.height;
      const keyboardVisible = heightDifference > Math.max(120, window.innerHeight * 0.15);
      setViewportMetrics({
        height: vv.height,
        bottomInset: Math.max(0, window.innerHeight - (vv.offsetTop + vv.height)),
        keyboardVisible,
      });

      window.requestAnimationFrame(() => {
        inputRef.current?.scrollIntoView({ block: 'nearest' });
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    };

    vv.addEventListener('resize', updateViewport);
    vv.addEventListener('scroll', updateViewport);
    window.addEventListener('resize', updateViewport);
    updateViewport();

    return () => {
      vv.removeEventListener('resize', updateViewport);
      vv.removeEventListener('scroll', updateViewport);
      window.removeEventListener('resize', updateViewport);
      setViewportMetrics(null);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (fallbackTimeoutRef.current !== null) {
        window.clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, []);

  // Hide tooltip
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const contact = document.getElementById('contact');
    if (!contact) return;
    const mobile = window.matchMedia('(max-width: 639px)');
    const observer = new IntersectionObserver(
      ([entry]) => setContactInViewOnMobile(mobile.matches && entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(contact);
    const onViewportChange = () => {
      if (!mobile.matches) setContactInViewOnMobile(false);
    };
    mobile.addEventListener('change', onViewportChange);
    return () => {
      observer.disconnect();
      mobile.removeEventListener('change', onViewportChange);
    };
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
            mode: conversationModeRef.current,
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

  const finalizeConversation = async (): Promise<void> => {
    if (finalizationPromiseRef.current) {
      return finalizationPromiseRef.current;
    }

    conversationDataRef.current.endTime ??= new Date();
    const finalization = (async () => {
      const conversationId = await saveConversation();
      if (conversationId) {
        await processConversation(conversationId);
      }
    })();

    finalizationPromiseRef.current = finalization;
    return finalization;
  };

  useEffect(() => {
    finalizeConversationRef.current = finalizeConversation;
  });

  const prepareNewConversation = useCallback(async () => {
    if (conversationDataRef.current.endTime) {
      await finalizationPromiseRef.current;
      conversationDataRef.current = {
        transcripts: [],
        startTime: null,
        endTime: null,
      };
      finalizationPromiseRef.current = null;
    }

    conversationDataRef.current.startTime ??= new Date();
  }, []);

  // Start a text-only session with ElevenLabs (no mic needed)
  const startTextSession = useCallback(async () => {
    if (isSessionActive) return; // already connected
    setIsConnecting(true);
    setError(null);
    conversationModeRef.current = 'text';

    try {
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'websocket',
        textOnly: true,
      });
    } catch (err) {
      console.error('Failed to start text session:', err);
      setError('Live AI chat is unavailable right now. You can still leave a message below.');
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, [AGENT_ID, conversation, isSessionActive]);

  const startVoice = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (isSessionActive || conversation.status === 'connected') {
        await conversation.endSession();
        setIsSessionActive(false);
        await finalizeConversationRef.current();
      }
      await prepareNewConversation();
      conversationModeRef.current = 'voice';
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'webrtc',
        textOnly: false,
      });
      setIsVoiceMode(true);
    } catch (err) {
      console.error('Failed to start voice:', err);
      setError(err instanceof Error ? err.message : 'Failed to start voice');
    } finally {
      setIsConnecting(false);
    }
  }, [AGENT_ID, conversation, isSessionActive, prepareNewConversation]);

  const endVoice = useCallback(async () => {
    try {
      await conversation.endSession();
    } finally {
      setIsVoiceMode(false);
      setIsSessionActive(false);
      await finalizeConversationRef.current();
    }
  }, [conversation]);

  // Send text message via the native ElevenLabs SDK
  const sendTextMessage = async () => {
    if (!inputText.trim()) return;

    await prepareNewConversation();
    if (!isVoiceMode) {
      conversationModeRef.current = 'text';
    }

    const userMsg: ChatMessage = {
      role: 'user',
      text: inputText.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    conversationDataRef.current.transcripts.push(userMsg);
    const messageText = inputText.trim();
    setInputText('');
    setIsTyping(true);
    agentResponseBuffer.current = '';

    // Check for email in message for lead capture
    const emailMatch = messageText.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      captureLead({
        email: emailMatch[0],
        source: 'chat_widget',
        notes: 'Email voluntarily provided via website chat.',
      });
    }

    try {
      // Start a text session if not already connected
      if (!isSessionActive) {
        await startTextSession();
        // Small delay to let the connection establish
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Use native ElevenLabs SDK to send text message
      conversation.sendUserMessage(messageText);

      // Set a timeout for the response — if no agent response comes in 15s, show fallback
      fallbackTimeoutRef.current = window.setTimeout(() => {
        fallbackTimeoutRef.current = null;
        setIsTyping((current) => {
          if (current) {
            // Still typing after timeout — agent didn't respond
            const response = getFallbackResponse(messageText);
            const fallbackMessage: ChatMessage = {
              role: 'agent',
              text: response,
              timestamp: new Date(),
            };
            conversationDataRef.current.transcripts.push(fallbackMessage);
            setMessages((prev) => [...prev, fallbackMessage]);
            return false;
          }
          return current;
        });
      }, 15000);
    } catch {
      // Fallback response if SDK fails
      const response = getFallbackResponse(messageText);
      const fallbackMessage: ChatMessage = {
        role: 'agent',
        text: response,
        timestamp: new Date(),
      };
      conversationDataRef.current.transcripts.push(fallbackMessage);
      setMessages((prev) => [...prev, fallbackMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  const handleClose = useCallback(async () => {
    setIsOpen(false);
    setShowTooltip(false);
    setIsTyping(false);

    if (fallbackTimeoutRef.current !== null) {
      window.clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }

    window.requestAnimationFrame(() => {
      if (contactInViewOnMobile) {
        const contactControl = document.querySelector<HTMLElement>(
          '#contact button, #contact a[href], #contact input, #contact select',
        );
        contactControl?.focus();
      } else {
        launcherRef.current?.focus();
      }
    });

    try {
      if (isSessionActive || conversation.status === 'connected') {
        await conversation.endSession();
      }
    } catch (endError) {
      console.error('Failed to end conversation session:', endError);
    } finally {
      setIsVoiceMode(false);
      setIsSessionActive(false);
      await finalizeConversationRef.current();
    }
  }, [contactInViewOnMobile, conversation, isSessionActive]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        void handleClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleClose, isOpen]);

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;
  const availablePanelHeight = viewportMetrics
    ? Math.max(0, viewportMetrics.height - (viewportMetrics.keyboardVisible ? 24 : 140))
    : null;
  const panelBottom = viewportMetrics?.keyboardVisible
    ? viewportMetrics.bottomInset + 12
    : 80;

  return (
    <div
      data-chat-widget
      className={`fixed right-4 sm:right-6 z-[110] transition-all duration-300 ${
        hasStickyMobileCTA ? 'bottom-24 sm:bottom-6' : 'bottom-4 sm:bottom-6'
      }`}
    >
      {/* Chat Panel */}
      {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed z-[120] bg-card border border-border shadow-2xl overflow-hidden flex flex-col rounded-2xl"
            style={{
              bottom: `${panelBottom}px`,
              right: 'max(12px, env(safe-area-inset-right))',
              width: 'min(380px, calc(100vw - 24px))',
              height: availablePanelHeight === null
                ? 'min(560px, calc(100dvh - 140px))'
                : `${Math.min(560, availablePanelHeight)}px`,
              maxHeight: availablePanelHeight === null
                ? 'calc(100dvh - 140px)'
                : `${availablePanelHeight}px`,
            }}
            id="chat-panel"
            role="dialog"
            aria-labelledby="chat-panel-title"
          >
            {/* Header */}
            <div
              className="text-white px-4 py-3 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent}99)` }}
            >
              <div className="flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-white/80'} animate-pulse`}
                />
                <span id="chat-panel-title" className="font-medium text-sm">{displayName}</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Voice toggle */}
                <button
                  type="button"
                  onClick={isConnected && isVoiceMode ? endVoice : startVoice}
                  disabled={isConnecting}
                  className={`w-11 h-11 inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                    isConnected && isVoiceMode
                      ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                      : 'hover:bg-white/10 text-background/70'
                  }`}
                  title={isConnected && isVoiceMode ? 'End voice call' : 'Start voice call'}
                  aria-label={isConnected && isVoiceMode ? 'End voice call' : 'Start voice call'}
                >
                  {isConnecting ? (
                    <Loader2 aria-hidden="true" className="w-4 h-4 animate-spin" />
                  ) : isConnected && isVoiceMode ? (
                    <MicOff aria-hidden="true" className="w-4 h-4" />
                  ) : (
                    <Mic aria-hidden="true" className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => void handleClose()}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-lg hover:bg-white/10 text-background/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  aria-label="Close chat"
                >
                  <X aria-hidden="true" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Voice status bar */}
            <AnimatePresence>
              {isConnected && isVoiceMode && (
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
                    type="button"
                    onClick={endVoice}
                    className="ml-auto min-h-11 px-2 text-xs text-destructive hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                    aria-label="End voice call"
                  >
                    End call
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div
              className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3"
              style={{ scrollbarWidth: 'none' }}
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              aria-label={`${displayName} conversation`}
              aria-busy={isTyping}
            >
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
                <div
                  role="alert"
                  className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-1.5"
                >
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
                  aria-label={`Message ${displayName}`}
                  className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/40 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={sendTextMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-11 h-11 shrink-0 inline-flex items-center justify-center rounded-xl bg-accent-blue text-white hover:bg-accent-blue/90 disabled:opacity-30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 focus-visible:ring-offset-2"
                  aria-label="Send message"
                >
                  <Send aria-hidden="true" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="hidden sm:block absolute bottom-full right-0 mb-3 whitespace-nowrap"
          >
            <div className="bg-foreground text-background px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
              Chat with us
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-foreground rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      {(!contactInViewOnMobile || isOpen) && <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => {
          if (isOpen) {
            void handleClose();
          } else {
            setIsOpen(true);
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4"
        style={{ backgroundColor: isOpen ? '#18181b' : accent }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
      >
        {isOpen ? (
          <X aria-hidden="true" className="w-7 h-7 text-background" />
        ) : (
          <MessageCircle aria-hidden="true" className="w-7 h-7 text-white" />
        )}

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
      </motion.button>}
    </div>
  );
}

/** Fallback responses when ElevenLabs session is unavailable */
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
