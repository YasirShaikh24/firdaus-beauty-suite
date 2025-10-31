-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can read admin table (will be managed server-side)
CREATE POLICY "Admin users are private"
ON public.admin_users
FOR SELECT
TO authenticated
USING (false);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Everyone can view services
CREATE POLICY "Services are viewable by everyone"
ON public.services
FOR SELECT
USING (true);

-- Only authenticated users can insert services
CREATE POLICY "Authenticated users can insert services"
ON public.services
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users can update services
CREATE POLICY "Authenticated users can update services"
ON public.services
FOR UPDATE
TO authenticated
USING (true);

-- Only authenticated users can delete services
CREATE POLICY "Authenticated users can delete services"
ON public.services
FOR DELETE
TO authenticated
USING (true);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Everyone can view gallery
CREATE POLICY "Gallery is viewable by everyone"
ON public.gallery
FOR SELECT
USING (true);

-- Only authenticated users can manage gallery
CREATE POLICY "Authenticated users can insert gallery"
ON public.gallery
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery"
ON public.gallery
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete gallery"
ON public.gallery
FOR DELETE
TO authenticated
USING (true);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view messages
CREATE POLICY "Authenticated users can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);

-- Everyone can insert contact messages
CREATE POLICY "Anyone can insert contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can update messages
CREATE POLICY "Authenticated users can update contact messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (true);

-- Create parlor settings table
CREATE TABLE public.parlor_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  instagram TEXT,
  facebook TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.parlor_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can view settings
CREATE POLICY "Settings are viewable by everyone"
ON public.parlor_settings
FOR SELECT
USING (true);

-- Only authenticated users can update settings
CREATE POLICY "Authenticated users can update settings"
ON public.parlor_settings
FOR UPDATE
TO authenticated
USING (true);

-- Insert default settings
INSERT INTO public.parlor_settings (name, phone, whatsapp, email, address, instagram, facebook)
VALUES (
  'Firdaus Makeover',
  '+919876543210',
  '919876543210',
  'hello@firdausmakeover.com',
  'Your Address Here',
  'https://instagram.com/firdausmakeover',
  'https://facebook.com/firdausmakeover'
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_parlor_settings_updated_at BEFORE UPDATE ON public.parlor_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();