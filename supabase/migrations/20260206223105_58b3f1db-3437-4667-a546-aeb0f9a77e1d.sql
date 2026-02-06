
-- Create campaign status enum
CREATE TYPE public.campaign_status AS ENUM ('draft', 'scheduled', 'sending', 'sent', 'cancelled');

-- Create email_campaigns table
CREATE TABLE public.email_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL DEFAULT '',
  status public.campaign_status NOT NULL DEFAULT 'draft',
  recipient_filter JSONB DEFAULT '{}'::jsonb,
  total_recipients INTEGER NOT NULL DEFAULT 0,
  total_sent INTEGER NOT NULL DEFAULT 0,
  total_opened INTEGER NOT NULL DEFAULT 0,
  total_clicked INTEGER NOT NULL DEFAULT 0,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create email_campaign_recipients table
CREATE TABLE public.email_campaign_recipients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaign_recipients ENABLE ROW LEVEL SECURITY;

-- RLS policies for email_campaigns
CREATE POLICY "Admins can view campaigns"
  ON public.email_campaigns FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can create campaigns"
  ON public.email_campaigns FOR INSERT
  WITH CHECK (public.has_admin_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update campaigns"
  ON public.email_campaigns FOR UPDATE
  USING (public.has_admin_role(auth.uid(), 'admin'));

CREATE POLICY "Super admins can delete campaigns"
  ON public.email_campaigns FOR DELETE
  USING (public.has_admin_role(auth.uid(), 'super_admin'));

-- RLS policies for email_campaign_recipients
CREATE POLICY "Admins can view recipients"
  ON public.email_campaign_recipients FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage recipients"
  ON public.email_campaign_recipients FOR ALL
  USING (public.has_admin_role(auth.uid(), 'admin'));

-- Indexes
CREATE INDEX idx_campaign_recipients_campaign ON public.email_campaign_recipients(campaign_id);
CREATE INDEX idx_campaign_recipients_lead ON public.email_campaign_recipients(lead_id);
CREATE INDEX idx_campaigns_status ON public.email_campaigns(status);

-- Updated_at trigger
CREATE TRIGGER update_email_campaigns_updated_at
  BEFORE UPDATE ON public.email_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for campaigns
ALTER PUBLICATION supabase_realtime ADD TABLE public.email_campaigns;
