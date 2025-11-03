import { useState, useEffect } from "react";
import { Eye, Filter, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroGallery from "@/assets/hero-gallery.jpg";

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  category: string | null;
}

const Gallery = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'bridal',
    image_url: ''
  });

  const filters = [
    { id: "all", name: "All" },
    { id: "bridal", name: "Bridal" },
    { id: "party", name: "Party" },
    { id: "hair", name: "Hair Styling" },
    { id: "traditional", name: "Traditional" }
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery",
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
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('gallery')
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
      if (!formData.title || !formData.image_url) {
        toast({
          title: "Error",
          description: "Title and image are required",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('gallery')
        .insert([{
          title: formData.title,
          category: formData.category,
          image_url: formData.image_url
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image added to gallery"
      });

      setIsDialogOpen(false);
      setFormData({ title: '', category: 'bridal', image_url: '' });
      fetchImages();
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: "Error",
        description: "Failed to save image",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully"
      });
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  const filteredImages = activeFilter === "all" 
    ? images 
    : images.filter(image => image.category === activeFilter);

  return (
    <div className="space-y-16">
      {/* Header */}
      <section 
        className="relative py-32 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroGallery})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Discover our stunning transformations and beauty creations
          </p>
          <Badge variant="outline" className="text-white border-white px-4 py-2">
            <Eye className="w-4 h-4 mr-2" />
            {images.length}+ Happy Clients
          </Badge>
          {isAdmin && (
            <div className="mt-6">
              <Button 
                variant="hero"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Image
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <div className="flex items-center mr-4">
            <Filter className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="font-medium">Filter by:</span>
          </div>
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "premium" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className="transition-all duration-300"
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">Loading gallery...</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No images in this category yet</p>
            {isAdmin && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Image
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Responsive Grid - 2 columns on mobile, 3 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredImages.map((image) => (
                <div 
                  key={image.id} 
                  className="group cursor-pointer aspect-square relative"
                  onClick={() => setSelectedImage(image.image_url)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-card hover:shadow-elegant transition-all duration-300 h-full">
                    <img 
                      src={image.image_url} 
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                        <Eye className="h-8 w-8 mx-auto mb-2" />
                        <p className="font-semibold">{image.title}</p>
                      </div>
                    </div>
                    {isAdmin && (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(image.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Add Image Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Traditional Bridal Look"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="bridal">Bridal</option>
                <option value="party">Party</option>
                <option value="hair">Hair Styling</option>
                <option value="traditional">Traditional</option>
              </select>
            </div>
            <div>
              <Label htmlFor="image">Upload Image *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              {uploading && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
              {formData.image_url && (
                <img src={formData.image_url} alt="Preview" className="mt-2 h-32 w-auto rounded" />
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                Add to Gallery
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Gallery Image"
              className="max-w-full max-h-full object-contain"
            />
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;