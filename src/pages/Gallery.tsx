import { useState } from "react";
import { Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroGallery from "@/assets/hero-gallery.jpg";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filters = [
    { id: "all", name: "All" },
    { id: "bridal", name: "Bridal" },
    { id: "party", name: "Party" },
    { id: "hairstyling", name: "Hair Styling" },
  ];

  // Gallery images - Add images to public/gallery/ folders:
  // public/gallery/bridal/image1.png to image4.png
  // public/gallery/party/image1.png to image4.png
  // public/gallery/hairstyling/image1.png to image4.png
  // public/gallery/featured/image1.png to image3.png
  const galleryImages = [
    // Bridal images (4)
    { id: 1, src: "/gallery/bridal/image1.png", alt: "Bridal Makeup 1", category: "bridal", title: "Traditional Bridal Look" },
    { id: 2, src: "/gallery/bridal/image2.png", alt: "Bridal Makeup 2", category: "bridal", title: "Modern Bridal Makeup" },
    { id: 3, src: "/gallery/bridal/image3.png", alt: "Bridal Makeup 3", category: "bridal", title: "Reception Makeup" },
    { id: 4, src: "/gallery/bridal/image4.png", alt: "Bridal Makeup 4", category: "bridal", title: "Elegant Bridal Look" },
    
    // Party images (4)
    { id: 5, src: "/gallery/party/image1.png", alt: "Party Makeup 1", category: "party", title: "Glamorous Evening Look" },
    { id: 6, src: "/gallery/party/image2.png", alt: "Party Makeup 2", category: "party", title: "Cocktail Party Look" },
    { id: 7, src: "/gallery/party/image3.png", alt: "Party Makeup 3", category: "party", title: "Birthday Party Glam" },
    { id: 8, src: "/gallery/party/image4.png", alt: "Party Makeup 4", category: "party", title: "Night Out Look" },
    
    // Hair Styling images (4)
    { id: 9, src: "/gallery/hairstyling/image1.png", alt: "Hair Styling 1", category: "hairstyling", title: "Elegant Hair Styling" },
    { id: 10, src: "/gallery/hairstyling/image2.png", alt: "Hair Styling 2", category: "hairstyling", title: "Bridal Hair Styling" },
    { id: 11, src: "/gallery/hairstyling/image3.png", alt: "Hair Styling 3", category: "hairstyling", title: "Vintage Hair Style" },
    { id: 12, src: "/gallery/hairstyling/image4.png", alt: "Hair Styling 4", category: "hairstyling", title: "Modern Updo" },
    
    // Featured/Overall images (3)
    { id: 13, src: "/gallery/featured/image1.png", alt: "Featured Look 1", category: "all", title: "Signature Look" },
    { id: 14, src: "/gallery/featured/image2.png", alt: "Featured Look 2", category: "all", title: "Best of Beauty" },
    { id: 15, src: "/gallery/featured/image3.png", alt: "Featured Look 3", category: "all", title: "Top Creation" },
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

        {/* Horizontal Grid - 4 images per row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-card hover:shadow-elegant transition-all duration-300">
                <AspectRatio ratio={3 / 4} className="bg-muted">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </AspectRatio>
                
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
