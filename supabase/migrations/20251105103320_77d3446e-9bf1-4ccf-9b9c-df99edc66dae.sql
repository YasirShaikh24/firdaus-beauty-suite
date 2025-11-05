-- Remove admin-related tables and types
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TYPE IF EXISTS public.app_role CASCADE;

-- Update RLS policies to remove admin-specific ones
DROP POLICY IF EXISTS "Admins can manage about content" ON public.about_content;
DROP POLICY IF EXISTS "Admins can manage home content" ON public.home_content;

-- Remove has_role function
DROP FUNCTION IF EXISTS public.has_role(_user_id uuid, _role app_role);