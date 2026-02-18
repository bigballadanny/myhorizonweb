-- Allow anonymous users to insert leads (from website forms/chat)
-- This enables the frontend to capture leads without authentication

CREATE POLICY "Allow anonymous lead inserts" ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow anonymous inserts to visitor_sessions for tracking
CREATE POLICY "Allow anonymous visitor session inserts" ON public.visitor_sessions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow anonymous inserts to conversations (for voice widget)
CREATE POLICY "Allow anonymous conversation inserts" ON public.conversations
  FOR INSERT
  TO anon
  WITH CHECK (true);
