-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create home page content table
CREATE TABLE public.home_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    image_url TEXT,
    button_text TEXT,
    button_link TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;

-- RLS for home_content
CREATE POLICY "Anyone can view home content"
ON public.home_content FOR SELECT
USING (true);

CREATE POLICY "Admins can manage home content"
ON public.home_content FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create about page content table
CREATE TABLE public.about_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    title TEXT,
    description TEXT,
    image_url TEXT,
    stats_label TEXT,
    stats_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about content"
ON public.about_content FOR SELECT
USING (true);

CREATE POLICY "Admins can manage about content"
ON public.about_content FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Update trigger for timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_home_content_updated_at
    BEFORE UPDATE ON public.home_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_about_content_updated_at
    BEFORE UPDATE ON public.about_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- Insert default home content
INSERT INTO public.home_content (section_key, title, subtitle, description, button_text, button_link) VALUES
('hero', 'Where Beauty Meets Elegance', 'Transform Your Look with Expert Care', 'Experience the finest beauty treatments and makeup artistry in a luxurious, welcoming environment.', 'Book Your Appointment', '/contact'),
('services_intro', 'Our Services', 'Discover Excellence', 'From bridal makeup to party looks, we offer comprehensive beauty solutions tailored to your needs.', 'View All Services', '/services'),
('testimonials', 'What Our Clients Say', 'Trusted by Thousands', 'Read stories from our satisfied customers who have experienced the Firdaus difference.', null, null);

-- Insert default about content  
INSERT INTO public.about_content (section_key, title, description, stats_label, stats_value) VALUES
('intro', 'About Firdaus Makeover', 'Firdaus Makeover is a premier beauty destination where artistry meets excellence. With years of experience and a passion for enhancing natural beauty, we specialize in bridal makeup, party looks, and complete beauty transformations.', 'Years of Excellence', '10+'),
('mission', 'Our Mission', 'To empower every individual through the art of beauty, helping them feel confident and radiant on their special occasions.', 'Happy Clients', '5000+'),
('team', 'Expert Team', 'Our team of certified professionals stays updated with the latest trends and techniques to deliver exceptional results.', 'Services Offered', '25+');