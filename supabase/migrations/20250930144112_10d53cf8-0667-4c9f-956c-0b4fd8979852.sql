-- Create audit log table for tracking all admin actions
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only super admins can view audit logs
CREATE POLICY "Super admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'super_admin'
  )
);

-- System can insert audit logs
CREATE POLICY "System can insert audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (true);

-- Create function to automatically log admin user changes
CREATE OR REPLACE FUNCTION public.log_admin_user_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.audit_logs (user_id, action, table_name, record_id, new_values)
    VALUES (auth.uid(), 'INSERT', TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_logs (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (auth.uid(), 'UPDATE', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_logs (user_id, action, table_name, record_id, old_values)
    VALUES (auth.uid(), 'DELETE', TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
  END IF;
  RETURN NULL;
END;
$$;

-- Add triggers for audit logging on key tables
CREATE TRIGGER audit_admin_users
AFTER INSERT OR UPDATE OR DELETE ON public.admin_users
FOR EACH ROW EXECUTE FUNCTION public.log_admin_user_changes();

CREATE TRIGGER audit_leads
AFTER INSERT OR UPDATE OR DELETE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.log_admin_user_changes();

CREATE TRIGGER audit_appointments
AFTER INSERT OR UPDATE OR DELETE ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.log_admin_user_changes();

-- Update admin_users table to link to auth.users
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.admin_users ADD CONSTRAINT unique_auth_user UNIQUE (auth_user_id);

-- Create function to create admin_user record when auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_users (auth_user_id, email, role, password_hash)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'viewer')::admin_role,
    'supabase_managed'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create admin_user on auth signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- Update RLS policies to use auth.uid()
DROP POLICY IF EXISTS "Admins can view all admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin users" ON public.admin_users;

CREATE POLICY "Authenticated admins can view admin users"
ON public.admin_users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.auth_user_id = auth.uid()
  )
);

CREATE POLICY "Super admins can manage admin users"
ON public.admin_users
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.auth_user_id = auth.uid()
    AND au.role = 'super_admin'
  )
);

-- Update other RLS policies to use auth_user_id
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Super admins can delete leads" ON public.leads;

CREATE POLICY "Authenticated admins can view leads"
ON public.leads
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.auth_user_id = auth.uid()
  )
);

CREATE POLICY "Authenticated admins can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.auth_user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.auth_user_id = auth.uid()
    AND admin_users.role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Super admins can delete leads"
ON public.leads
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.auth_user_id = auth.uid()
    AND admin_users.role = 'super_admin'
  )
);

-- Update appointments RLS policies
DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can manage appointments" ON public.appointments;

CREATE POLICY "Authenticated admins can view appointments"
ON public.appointments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.auth_user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage appointments"
ON public.appointments
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.auth_user_id = auth.uid()
    AND admin_users.role IN ('admin', 'super_admin')
  )
);

-- Update interactions RLS policies
DROP POLICY IF EXISTS "Admins can view all interactions" ON public.interactions;
DROP POLICY IF EXISTS "Admins can insert interactions" ON public.interactions;

CREATE POLICY "Authenticated admins can view interactions"
ON public.interactions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.auth_user_id = auth.uid()
  )
);

CREATE POLICY "Authenticated admins can insert interactions"
ON public.interactions
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.auth_user_id = auth.uid()
  )
);

-- Update conversations RLS policies
DROP POLICY IF EXISTS "Admins can view all conversations" ON public.conversations;

CREATE POLICY "Authenticated admins can view conversations"
ON public.conversations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.auth_user_id = auth.uid()
  )
);