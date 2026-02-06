import { useConversation } from '@elevenlabs/react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Phone, PhoneOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AGENT_ID = 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g';

interface ConversationData {
  transcripts: Array<{ role: string; text: string; timestamp: Date }>;
  startTime: Date | null;
  endTime: Date | null;
}

export function ElevenLabsWidget() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const conversationDataRef = useRef<ConversationData>({
    transcripts: [],
    startTime: null,
    endTime: null,
  });

  const conversation = useConversation({
    onConnect: () => {
      console.log('ElevenLabs: Connected to agent');
      conversationDataRef.current.startTime = new Date();
      conversationDataRef.current.transcripts = [];
      setError(null);
    },
    onDisconnect: async () => {
      console.log('ElevenLabs: Disconnected from agent');
      conversationDataRef.current.endTime = new Date();
      
      // Save conversation to database when disconnected
      await saveConversation();
    },
    onMessage: (message) => {
      console.log('ElevenLabs message:', message);
      
      // Cast to access dynamic properties
      const msg = message as unknown as {
        type?: string;
        user_transcription_event?: { user_transcript: string };
        agent_response_event?: { agent_response: string };
      };
      
      // Capture transcripts
      if (msg.type === 'user_transcript' && msg.user_transcription_event) {
        conversationDataRef.current.transcripts.push({
          role: 'user',
          text: msg.user_transcription_event.user_transcript,
          timestamp: new Date(),
        });
      }
      
      if (msg.type === 'agent_response' && msg.agent_response_event) {
        conversationDataRef.current.transcripts.push({
          role: 'agent',
          text: msg.agent_response_event.agent_response,
          timestamp: new Date(),
        });
      }
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      setError('Connection error. Please try again.');
      setIsConnecting(false);
    },
  });

  // Hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const saveConversation = async () => {
    const data = conversationDataRef.current;
    
    if (data.transcripts.length === 0) {
      console.log('No transcripts to save');
      return;
    }

    try {
      // Format transcript
      const formattedTranscript = data.transcripts
        .map(t => `${t.role}: ${t.text}`)
        .join('\n');

      // Calculate duration
      const durationSeconds = data.startTime && data.endTime
        ? Math.floor((data.endTime.getTime() - data.startTime.getTime()) / 1000)
        : null;

      console.log('Saving conversation:', { 
        transcriptLength: formattedTranscript.length,
        duration: durationSeconds 
      });

      // Insert conversation
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .insert({
          agent_id: AGENT_ID,
          transcript: formattedTranscript,
          duration_seconds: durationSeconds,
          call_type: 'inbound',
          metadata: {
            source: 'react_sdk',
            page_url: window.location.href,
            captured_at: new Date().toISOString(),
          },
        })
        .select()
        .single();

      if (convError) {
        console.error('Error saving conversation:', convError);
      } else {
        console.log('Conversation saved:', convData?.id);
      }

    } catch (err) {
      console.error('Failed to save conversation:', err);
    }
  };

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    setShowTooltip(false);

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Try to get signed URL from edge function, fall back to direct connection
      const { data, error: fnError } = await supabase.functions.invoke(
        'elevenlabs-conversation-token'
      );

      if (fnError) {
        throw new Error(fnError.message || 'Failed to get conversation token');
      }

      console.log('Token response:', data);

      // Start the conversation session
      if (data?.signed_url) {
        // Use signed URL for authenticated agents (WebSocket)
        await conversation.startSession({
          signedUrl: data.signed_url,
        });
      } else {
        // Use agent ID for public agents (WebRTC)
        await conversation.startSession({
          agentId: data?.agent_id || AGENT_ID,
          connectionType: 'webrtc',
        });
      }

    } catch (err) {
      console.error('Failed to start conversation:', err);
      setError(err instanceof Error ? err.message : 'Failed to start conversation');
      setIsConnecting(false);
    }
  }, [conversation]);

  const endConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  // Track connection state changes
  useEffect(() => {
    if (conversation.status === 'connected') {
      setIsConnecting(false);
    }
  }, [conversation.status]);

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isConnected && !isConnecting && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
          >
            <div className="bg-foreground text-background px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
              Talk to our AI
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-foreground rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-3 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status indicator when connected */}
      <AnimatePresence>
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-lg"
          >
            <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
            <span className="text-sm font-medium text-foreground">
              {isSpeaking ? 'AI Speaking...' : 'Listening...'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={isConnected ? endConversation : startConversation}
        disabled={isConnecting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl
          flex items-center justify-center
          transition-all duration-300
          ${isConnected 
            ? 'bg-destructive hover:bg-destructive/90' 
            : 'bg-primary hover:bg-primary/90'
          }
          ${isConnecting ? 'cursor-wait' : 'cursor-pointer'}
          focus:outline-none focus:ring-4 focus:ring-primary/30
        `}
        aria-label={isConnected ? 'End conversation' : 'Start voice conversation'}
      >
        {isConnecting ? (
          <Loader2 className="w-7 h-7 text-primary-foreground animate-spin" />
        ) : isConnected ? (
          <PhoneOff className="w-7 h-7 text-destructive-foreground" />
        ) : (
          <Phone className="w-7 h-7 text-primary-foreground" />
        )}

        {/* Pulsing ring - idle or connected */}
        {isConnected ? (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-destructive"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ) : !isConnecting && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
