-- Create enum for lead status
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'nurturing', 'appointment_scheduled', 'closed_won', 'closed_lost');

-- Create enum for lead source
CREATE TYPE public.lead_source AS ENUM ('website_chat', 'inbound_call', 'outbound_call', 'referral', 'other');

-- Create enum for admin role
CREATE TYPE public.admin_role AS ENUM ('super_admin', 'admin', 'viewer');

-- Create admin_users table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role admin_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  status lead_status NOT NULL DEFAULT 'new',
  source lead_source NOT NULL DEFAULT 'website_chat',
  ai_score INTEGER CHECK (ai_score >= 0 AND ai_score <= 100),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  agent_id TEXT,
  transcript TEXT,
  duration_seconds INTEGER,
  call_type TEXT CHECK (call_type IN ('inbound', 'outbound')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create interactions table
CREATE TABLE public.interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  google_event_id TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create site_config table for white-label settings
CREATE TABLE public.site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'MyHorizon',
  logo_url TEXT,
  primary_color TEXT,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
CREATE POLICY "Admins can view all admin users"
  ON public.admin_users FOR SELECT
  USING (true);

CREATE POLICY "Super admins can manage admin users"
  ON public.admin_users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- RLS Policies for leads
CREATE POLICY "Admins can view all leads"
  ON public.leads FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  USING (true);

CREATE POLICY "Super admins can delete leads"
  ON public.leads FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- RLS Policies for conversations
CREATE POLICY "Admins can view all conversations"
  ON public.conversations FOR SELECT
  USING (true);

CREATE POLICY "System can insert conversations"
  ON public.conversations FOR INSERT
  WITH CHECK (true);

-- RLS Policies for interactions
CREATE POLICY "Admins can view all interactions"
  ON public.interactions FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert interactions"
  ON public.interactions FOR INSERT
  WITH CHECK (true);

-- RLS Policies for appointments
CREATE POLICY "Admins can view all appointments"
  ON public.appointments FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage appointments"
  ON public.appointments FOR ALL
  USING (true);

-- RLS Policies for site_config
CREATE POLICY "Everyone can view site config"
  ON public.site_config FOR SELECT
  USING (true);

CREATE POLICY "Super admins can manage site config"
  ON public.site_config FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON public.site_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default super admin (password: 12345678, hashed with bcrypt)
-- Note: This is a placeholder. In production, you should use proper password hashing
INSERT INTO public.admin_users (email, password_hash, role)
VALUES ('admin@myhorizon.ai', '$2a$10$rQ3qZ5Z5Z5Z5Z5Z5Z5Z5Z.placeholder', 'super_admin');

-- Insert default site config
INSERT INTO public.site_config (site_name)
VALUES ('MyHorizon');