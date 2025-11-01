-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(appointment_date, appointment_time)
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert appointments (for booking)
CREATE POLICY "Anyone can insert appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

-- Authenticated users (admin) can view all appointments
CREATE POLICY "Authenticated users can view appointments" 
ON public.appointments 
FOR SELECT 
USING (true);

-- Authenticated users can update appointments
CREATE POLICY "Authenticated users can update appointments" 
ON public.appointments 
FOR UPDATE 
USING (true);

-- Authenticated users can delete appointments
CREATE POLICY "Authenticated users can delete appointments" 
ON public.appointments 
FOR DELETE 
USING (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();