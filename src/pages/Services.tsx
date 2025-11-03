import { useState, useEffect } from "react";
import { Clock, Star, ArrowRight, Edit2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import heroServices from "@/assets/hero-services.jpg";

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
}

const Services = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('services')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('services')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
      
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.title) {
        toast({
          title: "Error",
          description: "Title is required",
          variant: "destructive"
        });
        return;
      }

      const serviceData = {
        title: formData.title,
        description: formData.description,
        price: formData.price ? parseFloat(formData.price) : null,
        image_url: formData.image_url || null
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Service ${editingService ? 'updated' : 'created'} successfully`
      });

      setIsDialogOpen(false);
      setEditingService(null);
      setFormData({ title: '', description: '', price: '', image_url: '' });
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description || '',
      price: service.price?.toString() || '',
      image_url: service.image_url || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Service deleted successfully"
      });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive"
      });
    }
  };

  const handleAddNew = () => {
    setEditingService(null);
    setFormData({ title: '', description: '', price: '', image_url: '' });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <section 
        className="relative py-32 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroServices})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Discover our comprehensive range of beauty services designed to make you look and feel absolutely stunning
          </p>
          {isAdmin && (
            <Button 
              variant="hero" 
              className="mt-6"
              onClick={handleAddNew}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4">
        {loading ? (
          <div className="text-center py-12">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No services available yet</p>
            {isAdmin && (
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Service
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 relative">
                {service.image_url ? (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={service.image_url} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20" />
                )}
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="font-playfair text-xl mb-2">{service.title}</CardTitle>
                    </div>
                    {service.price && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">₹{service.price}</p>
                      </div>
                    )}
                  </div>
                  {service.description && (
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Button variant="premium" className="w-full" asChild>
                      <Link to="/contact">
                        Book Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleEdit(service)}
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Service name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Service description"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="2500"
              />
            </div>
            <div>
              <Label htmlFor="image">Service Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              {uploading && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
              {formData.image_url && (
                <img src={formData.image_url} alt="Preview" className="mt-2 h-24 w-auto rounded" />
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                {editingService ? 'Update' : 'Create'}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="gradient-card py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-6">Need a Custom Package?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We can create a personalized beauty package tailored to your specific needs and budget
          </p>
          <Button variant="default" size="lg" asChild>
            <Link to="/contact">Contact Us for Custom Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
