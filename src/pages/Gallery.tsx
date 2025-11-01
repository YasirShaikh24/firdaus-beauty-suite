import { useState } from "react";
import { Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroGallery from "@/assets/hero-gallery.jpg";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filters = [
    { id: "all", name: "All" },
    { id: "bridal", name: "Bridal" },
    { id: "party", name: "Party" },
    { id: "hair", name: "Hair Styling" },
    { id: "traditional", name: "Traditional" }
  ];

  // Sample gallery images (in a real app, these would come from an API/database)
  const galleryImages = [
    {
      id: 1,
      src: "/api/placeholder/400/500",
      alt: "Bridal Makeup 1",
      category: "bridal",
      title: "Traditional Bridal Look"
    },
    {
      id: 2,
      src: "/api/placeholder/400/600",
      alt: "Party Makeup 1",
      category: "party",
      title: "Glamorous Evening Look"
    },
    {
      id: 3,
      src: "/api/placeholder/400/450",
      alt: "Hair Styling 1",
      category: "hair",
      title: "Elegant Hair Styling"
    },
    {
      id: 4,
      src: "/api/placeholder/400/550",
      alt: "Traditional Look 1",
      category: "traditional",
      title: "Traditional Indian Bride"
    },
    {
      id: 5,
      src: "/api/placeholder/400/480",
      alt: "Bridal Makeup 2",
      category: "bridal",
      title: "Modern Bridal Makeup"
    },
    {
      id: 6,
      src: "/api/placeholder/400/520",
      alt: "Party Makeup 2",
      category: "party",
      title: "Cocktail Party Look"
    },
    {
      id: 7,
      src: "/api/placeholder/400/580",
      alt: "Hair Styling 2",
      category: "hair",
      title: "Bridal Hair Styling"
    },
    {
      id: 8,
      src: "/api/placeholder/400/460",
      alt: "Traditional Look 2",
      category: "traditional",
      title: "South Indian Bride"
    },
    {
      id: 9,
      src: "/api/placeholder/400/540",
      alt: "Bridal Makeup 3",
      category: "bridal",
      title: "Reception Makeup"
    },
    {
      id: 10,
      src: "/api/placeholder/400/490",
      alt: "Party Makeup 3",
      category: "party",
      title: "Birthday Party Glam"
    },
    {
      id: 11,
      src: "/api/placeholder/400/560",
      alt: "Hair Styling 3",
      category: "hair",
      title: "Vintage Hair Style"
    },
    {
      id: 12,
      src: "/api/placeholder/400/470",
      alt: "Traditional Look 3",
      category: "traditional",
      title: "Bengali Bride"
    }
  ];

  const filteredImages = activeFilter === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeFilter);

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
            500+ Happy Clients
          </Badge>
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

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-card hover:shadow-elegant transition-all duration-300">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                    <Eye className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">{image.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Images
          </Button>
        </div>
      </section>

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

      {/* CTA */}
      <section className="gradient-card py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-6">Ready to Be Our Next Success Story?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust us with their special moments
          </p>
          <Button variant="default" size="lg">
            Book Your Session Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;