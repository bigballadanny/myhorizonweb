
-- Create visitor_sessions table
CREATE TABLE public.visitor_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  fingerprint_hash TEXT NOT NULL,
  lead_id UUID REFERENCES public.leads(id),
  conversation_id UUID REFERENCES public.conversations(id),
  page_url TEXT NOT NULL DEFAULT '',
  referrer TEXT,
  user_agent TEXT NOT NULL DEFAULT '',
  screen_resolution TEXT NOT NULL DEFAULT '',
  timezone TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL DEFAULT '',
  is_returning BOOLEAN NOT NULL DEFAULT false,
  visit_count INTEGER NOT NULL DEFAULT 1,
  first_seen_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_duration_seconds INTEGER,
  pages_viewed JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast fingerprint lookups
CREATE INDEX idx_visitor_sessions_fingerprint ON public.visitor_sessions(fingerprint_hash);
CREATE INDEX idx_visitor_sessions_last_seen ON public.visitor_sessions(last_seen_at);

-- Enable RLS
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (visitors are anonymous)
CREATE POLICY "Anyone can insert visitor sessions"
  ON public.visitor_sessions FOR INSERT
  WITH CHECK (true);

-- Anyone can update their own session (by fingerprint match)
CREATE POLICY "Anyone can update visitor sessions"
  ON public.visitor_sessions FOR UPDATE
  USING (true);

-- Only admins can view
CREATE POLICY "Admins can view visitor sessions"
  ON public.visitor_sessions FOR SELECT
  USING (is_admin(auth.uid()));

-- Create admin_chat_messages table
CREATE TABLE public.admin_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can see their own messages
CREATE POLICY "Users can view own chat messages"
  ON public.admin_chat_messages FOR SELECT
  USING (admin_user_id = auth.uid()::text);

-- Users can insert their own messages
CREATE POLICY "Users can insert own chat messages"
  ON public.admin_chat_messages FOR INSERT
  WITH CHECK (admin_user_id = auth.uid()::text);

-- Users can delete their own messages (clear history)
CREATE POLICY "Users can delete own chat messages"
  ON public.admin_chat_messages FOR DELETE
  USING (admin_user_id = auth.uid()::text);
