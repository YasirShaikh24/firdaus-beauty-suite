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
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Edit, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
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
              <CardTitle className="text-lg">Contact Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{contacts.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="contacts">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

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
  const [open, setOpen] = useState(!!service);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    if (!service) {
      setFormData({ title: "", description: "", price: "", image_url: "" });
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
            <Label>Image URL</Label>
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <Button type="submit" className="w-full">
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
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ title: "", image_url: "", category: "" });
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
            <Label>Image URL</Label>
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
              required
            />
          </div>
          <div>
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Bridal, Party, etc."
            />
          </div>
          <Button type="submit" className="w-full">
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
