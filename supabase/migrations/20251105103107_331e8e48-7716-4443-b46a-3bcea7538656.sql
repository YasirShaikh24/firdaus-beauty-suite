-- Remove admin-related tables and types
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TYPE IF EXISTS public.app_role CASCADE;

-- Update RLS policies to remove admin-specific ones
DROP POLICY IF EXISTS "Admins can manage about content" ON public.about_content;
DROP POLICY IF EXISTS "Admins can manage home content" ON public.home_content;

-- Recreate simple policies for authenticated users
CREATE POLICY "Authenticated users can manage about content"
ON public.about_content
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage home content"
ON public.home_content
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Remove has_role function
DROP FUNCTION IF EXISTS public.has_role(_user_id uuid, _role app_role);