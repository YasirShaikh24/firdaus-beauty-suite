import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Edit, Trash2, Upload, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [settings, setSettings] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin-login');
        return;
      }
      
      setIsAuthenticated(true);
      loadData();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/admin-login');
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async () => {
    try {
      // Load services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      if (servicesData) setServices(servicesData);

      // Load gallery
      const { data: galleryData } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (galleryData) setGallery(galleryData);

      // Load contact messages
      const { data: contactsData } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (contactsData) setContacts(contactsData);

      // Load appointments
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: false })
        .order('appointment_time', { ascending: false });
      if (appointmentsData) setAppointments(appointmentsData);

      // Load settings
      const { data: settingsData } = await supabase
        .from('parlor_settings')
        .select('*')
        .single();
      if (settingsData) setSettings(settingsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const addService = async (serviceData: any) => {
    try {
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);
      
      if (error) throw error;
      
      await loadData();
      toast({
        title: "Service Added",
        description: "New service has been added successfully.",
      });
    } catch (error: any) {
      console.error('Error adding service:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateService = async (id: string, serviceData: any) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id);
      
      if (error) throw error;
      
      await loadData();
      toast({
        title: "Service Updated",
        description: "Service has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await loadData();
      toast({
        title: "Service Deleted",
        description: "Service has been deleted successfully.",
      });
    } catch (error: any) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addGalleryImage = async (imageData: any) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .insert([imageData]);
      
      if (error) throw error;
      
      await loadData();
      toast({
        title: "Image Added",
        description: "New image has been added to gallery.",
      });
    } catch (error: any) {
      console.error('Error adding image:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteGalleryImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await loadData();
      toast({
        title: "Image Deleted",
        description: "Image has been deleted from gallery.",
      });
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateSettings = async (settingsData: any) => {
    try {
      const { error } = await supabase
        .from('parlor_settings')
        .update(settingsData)
        .eq('id', settings.id);
      
      if (error) throw error;
      
      await loadData();
      toast({
        title: "Settings Updated",
        description: "Settings have been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addAppointment = async (appointmentData: any) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .insert([appointmentData]);
      
      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Time Slot Unavailable",
            description: "This time slot is already booked.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }
      
      await loadData();
      toast({
        title: "Appointment Added",
        description: "New appointment has been added successfully.",
      });
    } catch (error: any) {
      console.error('Error adding appointment:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateAppointment = async (id: string, appointmentData: any) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update(appointmentData)
        .eq('id', id);
      
      if (error) throw error;
      
      await loadData();
      toast({
        title: "Appointment Updated",
        description: "Appointment has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error updating appointment:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await loadData();
      toast({
        title: "Appointment Deleted",
        description: "Appointment has been deleted successfully.",
      });
    } catch (error: any) {
      console.error('Error deleting appointment:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your beauty parlor website</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="gradient-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{services.length}</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Gallery Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{gallery.length}</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{appointments.length}</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{contacts.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="contacts">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Appointments Management */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold">Manage Appointments</h2>
              <AppointmentDialog services={services} onSave={addAppointment} />
            </div>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No appointments yet</p>
                  </CardContent>
                </Card>
              ) : (
                appointments.map((appointment: any) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    services={services}
                    onUpdate={updateAppointment}
                    onDelete={deleteAppointment}
                  />
                ))
              )}
            </div>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold">Manage Services</h2>
              <ServiceDialog onSave={addService} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((service: any) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onUpdate={updateService}
                  onDelete={deleteService}
                />
              ))}
            </div>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold">Manage Gallery</h2>
              <GalleryDialog onSave={addGalleryImage} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((image: any) => (
                <GalleryCard
                  key={image.id}
                  image={image}
                  onDelete={deleteGalleryImage}
                />
              ))}
            </div>
          </TabsContent>

          {/* Contact Messages */}
          <TabsContent value="contacts" className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold">Contact Messages</h2>
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No messages yet</p>
                  </CardContent>
                </Card>
              ) : (
                contacts.map((contact: any) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))
              )}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold">Parlor Settings</h2>
            {settings && <SettingsForm settings={settings} onSave={updateSettings} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Appointment Card Component
const AppointmentCard = ({ appointment, services, onUpdate, onDelete }: any) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const statusColors = {
    pending: 'bg-yellow-500',
    confirmed: 'bg-green-500',
    cancelled: 'bg-red-500',
    completed: 'bg-blue-500'
  };

  return (
    <>
      <Card className="hover:shadow-elegant transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {appointment.client_name}
              </CardTitle>
              <CardDescription className="mt-1">
                {appointment.service_name}
              </CardDescription>
            </div>
            <Badge className={statusColors[appointment.status]}>
              {appointment.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm mb-4">
            <p><strong>Date:</strong> {new Date(appointment.appointment_date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {appointment.appointment_time}</p>
            <p><strong>Phone:</strong> {appointment.client_phone}</p>
            {appointment.client_email && <p><strong>Email:</strong> {appointment.client_email}</p>}
            {appointment.notes && <p><strong>Notes:</strong> {appointment.notes}</p>}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsEditOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(appointment.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      {isEditOpen && (
        <AppointmentDialog
          appointment={appointment}
          services={services}
          onSave={(data: any) => {
            onUpdate(appointment.id, data);
            setIsEditOpen(false);
          }}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

// Appointment Dialog Component
const AppointmentDialog = ({ appointment, services, onSave, onClose }: any) => {
  const [formData, setFormData] = useState({
    client_name: appointment?.client_name || "",
    client_email: appointment?.client_email || "",
    client_phone: appointment?.client_phone || "",
    service_name: appointment?.service_name || "",
    appointment_date: appointment?.appointment_date || "",
    appointment_time: appointment?.appointment_time || "10:00:00",
    status: appointment?.status || "pending",
    notes: appointment?.notes || "",
  });
  const [open, setOpen] = useState(!!appointment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    if (!appointment) {
      setFormData({
        client_name: "",
        client_email: "",
        client_phone: "",
        service_name: "",
        appointment_date: "",
        appointment_time: "10:00:00",
        status: "pending",
        notes: "",
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={appointment ? onClose : setOpen}>
      <DialogTrigger asChild>
        {!appointment && (
          <Button variant="default">
            <Plus className="h-4 w-4 mr-2" />
            Add Appointment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{appointment ? "Edit Appointment" : "Add New Appointment"}</DialogTitle>
          <DialogDescription>
            {appointment ? "Update appointment details" : "Manually add an appointment"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Client Name *</Label>
            <Input
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Phone *</Label>
            <Input
              value={formData.client_phone}
              onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.client_email}
              onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
            />
          </div>
          <div>
            <Label>Service *</Label>
            <Select value={formData.service_name} onValueChange={(value) => setFormData({ ...formData, service_name: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service: any) => (
                  <SelectItem key={service.id} value={service.title}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date *</Label>
              <Input
                type="date"
                value={formData.appointment_date}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Time *</Label>
              <Input
                type="time"
                value={formData.appointment_time}
                onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
            />
          </div>
          <Button type="submit" className="w-full">
            {appointment ? "Update Appointment" : "Add Appointment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Service Card Component
const ServiceCard = ({ service, onUpdate, onDelete }: any) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <Card className="hover:shadow-elegant transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg">{service.title}</CardTitle>
          <CardDescription className="line-clamp-2">{service.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-primary">₹{service.price}</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsEditOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(service.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      {isEditOpen && (
        <ServiceDialog
          service={service}
          onSave={(data: any) => {
            onUpdate(service.id, data);
            setIsEditOpen(false);
          }}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

// Service Dialog Component
const ServiceDialog = ({ service, onSave, onClose }: any) => {
  const [formData, setFormData] = useState({
    title: service?.title || "",
    description: service?.description || "",
    price: service?.price || "",
    image_url: service?.image_url || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(!!service);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('services')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('services')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast({
        title: "Image Uploaded",
        description: "Service image uploaded successfully",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    if (!service) {
      setFormData({ title: "", description: "", price: "", image_url: "" });
      setImageFile(null);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={service ? onClose : setOpen}>
      <DialogTrigger asChild>
        {!service && (
          <Button variant="default">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? "Edit Service" : "Add New Service"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Service Name</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Price (₹)</Label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <Label>Service Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  handleImageUpload(file);
                }
              }}
              disabled={uploading}
            />
            {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
            {formData.image_url && (
              <div className="mt-2">
                <img src={formData.image_url} alt="Preview" className="w-full h-32 object-cover rounded" />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={uploading}>
            {service ? "Update Service" : "Add Service"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Gallery Dialog Component
const GalleryDialog = ({ onSave }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast({
        title: "Image Uploaded",
        description: "Gallery image uploaded successfully",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ title: "", image_url: "", category: "" });
    setImageFile(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Upload className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Gallery Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Gallery Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  handleImageUpload(file);
                }
              }}
              disabled={uploading}
              required
            />
            {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
            {formData.image_url && (
              <div className="mt-2">
                <img src={formData.image_url} alt="Preview" className="w-full h-32 object-cover rounded" />
              </div>
            )}
          </div>
          <div>
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Bridal, Party, etc."
            />
          </div>
          <Button type="submit" className="w-full" disabled={uploading || !formData.image_url}>
            Add Image
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Gallery Card Component
const GalleryCard = ({ image, onDelete }: any) => (
  <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300">
    <div className="aspect-square relative">
      <img
        src={image.image_url}
        alt={image.title}
        className="w-full h-full object-cover"
      />
    </div>
    <CardContent className="p-4">
      <h3 className="font-semibold mb-2">{image.title}</h3>
      {image.category && <Badge variant="secondary" className="mb-2">{image.category}</Badge>}
      <Button
        size="sm"
        variant="destructive"
        className="w-full"
        onClick={() => onDelete(image.id)}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </CardContent>
  </Card>
);

// Contact Card Component
const ContactCard = ({ contact }: any) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{contact.name}</CardTitle>
          <CardDescription>{contact.email}</CardDescription>
        </div>
        <Badge variant={contact.status === 'unread' ? 'default' : 'secondary'}>
          {contact.status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      {contact.phone && <p className="text-sm mb-2"><strong>Phone:</strong> {contact.phone}</p>}
      <p className="text-sm">{contact.message}</p>
      <p className="text-xs text-muted-foreground mt-2">
        {new Date(contact.created_at).toLocaleDateString()}
      </p>
    </CardContent>
  </Card>
);

// Settings Form Component
const SettingsForm = ({ settings, onSave }: any) => {
  const [formData, setFormData] = useState({
    name: settings.name || "",
    phone: settings.phone || "",
    whatsapp: settings.whatsapp || "",
    email: settings.email || "",
    address: settings.address || "",
    instagram: settings.instagram || "",
    facebook: settings.facebook || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parlor Information</CardTitle>
        <CardDescription>Update contact and social media information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Parlor Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <Label>Instagram URL</Label>
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              />
            </div>
            <div>
              <Label>Facebook URL</Label>
              <Input
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              />
            </div>
          </div>
          <Button type="submit" className="w-full md:w-auto">
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Admin;
