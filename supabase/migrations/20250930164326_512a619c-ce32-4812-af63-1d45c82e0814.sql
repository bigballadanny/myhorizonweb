-- Fix infinite recursion in RLS policies by using security definer functions

-- Create security definer function to check if user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM admin_users
    WHERE auth_user_id = user_id
  );
$$;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.has_admin_role(user_id uuid, required_role admin_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM admin_users
    WHERE auth_user_id = user_id 
    AND (role = required_role OR role = 'super_admin')
  );
$$;

-- Drop and recreate admin_users policies
DROP POLICY IF EXISTS "Authenticated admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin users" ON admin_users;

CREATE POLICY "Authenticated admins can view admin users"
ON admin_users FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Super admins can manage admin users"
ON admin_users FOR ALL
USING (public.has_admin_role(auth.uid(), 'super_admin'));

-- Drop and recreate leads policies
DROP POLICY IF EXISTS "Authenticated admins can view leads" ON leads;
DROP POLICY IF EXISTS "Authenticated admins can insert leads" ON leads;
DROP POLICY IF EXISTS "Admins can update leads" ON leads;
DROP POLICY IF EXISTS "Super admins can delete leads" ON leads;

CREATE POLICY "Authenticated admins can view leads"
ON leads FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Authenticated admins can insert leads"
ON leads FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update leads"
ON leads FOR UPDATE
USING (public.has_admin_role(auth.uid(), 'admin'));

CREATE POLICY "Super admins can delete leads"
ON leads FOR DELETE
USING (public.has_admin_role(auth.uid(), 'super_admin'));

-- Fix appointments policies
DROP POLICY IF EXISTS "Authenticated admins can view appointments" ON appointments;
DROP POLICY IF EXISTS "Admins can manage appointments" ON appointments;

CREATE POLICY "Authenticated admins can view appointments"
ON appointments FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage appointments"
ON appointments FOR ALL
USING (public.has_admin_role(auth.uid(), 'admin'));

-- Fix interactions policies
DROP POLICY IF EXISTS "Authenticated admins can view interactions" ON interactions;
DROP POLICY IF EXISTS "Authenticated admins can insert interactions" ON interactions;

CREATE POLICY "Authenticated admins can view interactions"
ON interactions FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Authenticated admins can insert interactions"
ON interactions FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

-- Fix conversations policies
DROP POLICY IF EXISTS "Authenticated admins can view conversations" ON conversations;

CREATE POLICY "Authenticated admins can view conversations"
ON conversations FOR SELECT
USING (public.is_admin(auth.uid()));