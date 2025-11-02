-- Create storage buckets for services and gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('services', 'services', true),
  ('gallery', 'gallery', true);

-- Create policies for services bucket
CREATE POLICY "Services images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'services');

CREATE POLICY "Authenticated users can upload service images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'services' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update service images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'services' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete service images"
ON storage.objects FOR DELETE
USING (bucket_id = 'services' AND auth.uid() IS NOT NULL);

-- Create policies for gallery bucket
CREATE POLICY "Gallery images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery' AND auth.uid() IS NOT NULL);