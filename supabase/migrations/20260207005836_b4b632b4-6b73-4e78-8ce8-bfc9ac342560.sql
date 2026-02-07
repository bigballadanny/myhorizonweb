
-- Add estimated_value column to leads
ALTER TABLE public.leads ADD COLUMN estimated_value numeric DEFAULT 0;

-- Create email_templates table
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Admins can view templates
CREATE POLICY "Admins can view email templates"
ON public.email_templates FOR SELECT
USING (is_admin(auth.uid()));

-- Admins can manage templates
CREATE POLICY "Admins can manage email templates"
ON public.email_templates FOR ALL
USING (has_admin_role(auth.uid(), 'admin'::admin_role));

-- Insert default templates
INSERT INTO public.email_templates (name, subject, body_html) VALUES
('Introduction', 'Introducing MyHorizon AI — Your Growth Partner', '<h2>Hello {{name}},</h2><p>We''re MyHorizon AI, and we help businesses like {{company}} automate operations, qualify leads, and close more deals using cutting-edge AI agents and workflows.</p><p>Here''s what we can do for you:</p><ul><li>24/7 AI-powered lead qualification</li><li>Automated appointment scheduling</li><li>Intelligent CRM pipeline management</li></ul><p>Would you be open to a 15-minute call to explore how we can help?</p><p>Best,<br/>The MyHorizon Team</p>'),
('Follow-Up', 'Following Up on Our Conversation', '<h2>Hi {{name}},</h2><p>Great speaking with you! I wanted to follow up on our recent conversation about how AI automation could benefit {{company}}.</p><p>As discussed, our solutions typically help businesses:</p><ul><li>Save 20+ hours per week on repetitive tasks</li><li>Increase lead conversion rates by 3x</li><li>Reduce response times to under 60 seconds</li></ul><p>Ready to take the next step? Let''s schedule a demo.</p><p>Best,<br/>The MyHorizon Team</p>'),
('Case Study', 'How AI Automation Delivered 300% ROI', '<h2>Hi {{name}},</h2><p>I thought you''d find this interesting — one of our clients saw a <strong>300% ROI</strong> within 90 days of implementing our AI systems.</p><p><strong>The Challenge:</strong> Manual lead follow-up, missed appointments, overwhelmed team.</p><p><strong>The Solution:</strong> MyHorizon AI agents handling inbound calls, qualifying leads, and booking appointments automatically.</p><p><strong>The Results:</strong></p><ul><li>5x more qualified appointments</li><li>80% reduction in response time</li><li>Team freed up to focus on closing deals</li></ul><p>Want similar results for {{company}}? Let''s talk.</p><p>Best,<br/>The MyHorizon Team</p>');
