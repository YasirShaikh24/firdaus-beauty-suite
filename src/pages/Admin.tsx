import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Edit, Trash2, Upload, Eye } from "lucide-react";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (adminLoggedIn === "true") {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    const savedServices = localStorage.getItem("adminServices");
    const savedGallery = localStorage.getItem("adminGallery");
    const savedContacts = localStorage.getItem("adminContacts");
    
    if (savedServices) setServices(JSON.parse(savedServices));
    if (savedGallery) setGallery(JSON.parse(savedGallery));
    if (savedContacts) setContacts(JSON.parse(savedContacts));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === "admin123" && loginForm.password === "123") {
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);
      loadData();
      toast({
        title: "Login Successful",
        description: "Welcome to admin dashboard!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use admin123 / 123",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
    setLoginForm({ email: "", password: "" });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const saveServices = (updatedServices) => {
    localStorage.setItem("adminServices", JSON.stringify(updatedServices));
    setServices(updatedServices);
  };

  const saveGallery = (updatedGallery) => {
    localStorage.setItem("adminGallery", JSON.stringify(updatedGallery));
    setGallery(updatedGallery);
  };

  const addService = (serviceData) => {
    const newService = {
      id: Date.now(),
      ...serviceData,
      createdAt: new Date().toISOString()
    };
    const updatedServices = [...services, newService];
    saveServices(updatedServices);
    toast({
      title: "Service Added",
      description: "New service has been added successfully.",
    });
  };

  const updateService = (id, serviceData) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, ...serviceData } : service
    );
    saveServices(updatedServices);
    setEditingService(null);
    toast({
      title: "Service Updated",
      description: "Service has been updated successfully.",
    });
  };

  const deleteService = (id) => {
    const updatedServices = services.filter(service => service.id !== id);
    saveServices(updatedServices);
    toast({
      title: "Service Deleted",
      description: "Service has been deleted successfully.",
    });
  };

  const addGalleryImage = (imageData) => {
    const newImage = {
      id: Date.now(),
      ...imageData,
      uploadedAt: new Date().toISOString()
    };
    const updatedGallery = [...gallery, newImage];
    saveGallery(updatedGallery);
    toast({
      title: "Image Added",
      description: "New image has been added to gallery.",
    });
  };

  const deleteGalleryImage = (id) => {
    const updatedGallery = gallery.filter(image => image.id !== id);
    saveGallery(updatedGallery);
    toast({
      title: "Image Deleted",
      description: "Image has been deleted from gallery.",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="font-playfair text-3xl text-primary">Admin Login</CardTitle>
            <CardDescription>Login to manage Firdaus Makeover</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  placeholder="admin123"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="123"
                  required
                />
              </div>
              <Button type="submit" className="w-full" variant="premium">
                Login to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your beauty parlor website</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="contacts">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Services</h2>
              <ServiceDialog onSave={addService} service={null} onClose={() => {}} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={(service) => setEditingService(service)}
                  onDelete={deleteService}
                />
              ))}
            </div>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Gallery</h2>
              <GalleryDialog onSave={addGalleryImage} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map(image => (
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
            <h2 className="text-2xl font-bold">Contact Messages</h2>
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No messages yet</p>
                  </CardContent>
                </Card>
              ) : (
                contacts.map(contact => (
                  <ContactCard key={contact.id} contact={contact} />
                ))
              )}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Parlor Information</CardTitle>
                <CardDescription>Update your beauty parlor details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Parlor Name</Label>
                    <Input defaultValue="Firdaus Makeover" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Address</Label>
                    <Textarea defaultValue="123 Beauty Street, Fashion District, City - 400001" />
                  </div>
                </div>
                <Button variant="premium">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Service Dialog */}
        {editingService && (
          <ServiceDialog
            service={editingService}
            onSave={(data) => updateService(editingService.id, data)}
            onClose={() => setEditingService(null)}
            isEdit={true}
          />
        )}
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, onEdit, onDelete }) => (
  <Card className="hover:shadow-elegant transition-all duration-300">
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{service.name}</CardTitle>
        <Badge variant="secondary">{service.category}</Badge>
      </div>
      <CardDescription>{service.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-primary">{service.price}</span>
        <span className="text-sm text-muted-foreground">{service.duration}</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onEdit(service)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(service.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Service Dialog Component
const ServiceDialog = ({ service, onSave, onClose, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    category: service?.category || "bridal",
    price: service?.price || "",
    duration: service?.duration || "",
    description: service?.description || "",
    features: service?.features?.join(", ") || ""
  });
  const [open, setOpen] = useState(isEdit);

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceData = {
      ...formData,
      features: formData.features.split(",").map(f => f.trim()).filter(f => f)
    };
    onSave(serviceData);
    if (!isEdit) {
      setFormData({
        name: "", category: "bridal", price: "", duration: "", description: "", features: ""
      });
      setOpen(false);
    } else if (onClose) {
      onClose();
    }
  };

  if (isEdit && !onClose) return null;

  return (
    <Dialog open={isEdit ? true : open} onOpenChange={isEdit && onClose ? onClose : setOpen}>
      <DialogTrigger asChild>
        {!isEdit && (
          <Button variant="premium">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Service" : "Add New Service"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update service details" : "Add a new service to your offerings"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Service Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="bridal">Bridal</option>
              <option value="party">Party</option>
              <option value="hair">Hair</option>
              <option value="skin">Skin Care</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price</Label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="₹5,000"
                required
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                placeholder="2 hours"
                required
              />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <div>
            <Label>Features (comma separated)</Label>
            <Textarea
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              placeholder="HD Makeup, Hair Styling, Touch-ups"
            />
          </div>
          <Button type="submit" className="w-full" variant="premium">
            {isEdit ? "Update Service" : "Add Service"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Gallery Dialog Component
const GalleryDialog = ({ onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "bridal"
  });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ title: "", description: "", imageUrl: "", category: "bridal" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="premium">
          <Upload className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Gallery Image</DialogTitle>
          <DialogDescription>Add a new image to your portfolio gallery</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Image Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="bridal">Bridal</option>
              <option value="party">Party</option>
              <option value="hair">Hair</option>
              <option value="makeup">Makeup</option>
            </select>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <Button type="submit" className="w-full" variant="premium">
            Add Image
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Gallery Card Component
const GalleryCard = ({ image, onDelete }) => (
  <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300">
    <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative">
      {image.imageUrl && (
        <img 
          src={image.imageUrl} 
          alt={image.title}
          className="w-full h-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )}
      <div className="absolute top-2 right-2 flex gap-2">
        <Button size="sm" variant="destructive" onClick={() => onDelete(image.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <CardContent className="p-3">
      <h4 className="font-semibold text-sm">{image.title}</h4>
      <Badge variant="secondary" className="mt-1 text-xs">{image.category}</Badge>
    </CardContent>
  </Card>
);

// Contact Card Component
const ContactCard = ({ contact }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-lg">{contact.name}</CardTitle>
          <CardDescription>{contact.email} • {contact.phone}</CardDescription>
        </div>
        <Badge variant="outline">{new Date(contact.createdAt).toLocaleDateString()}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm">{contact.message}</p>
    </CardContent>
  </Card>
);

export default Admin;