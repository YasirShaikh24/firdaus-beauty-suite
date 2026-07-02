import { useState } from "react";
import { Eye, Filter, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import heroGallery from "@/assets/hero-gallery.jpg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Reveal = ({
  children, direction = "from-bottom", delay = "", className = "",
}: {
  children: React.ReactNode;
  direction?: "from-left" | "from-right" | "from-bottom" | "bump";
  delay?: string; className?: string;
}) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`reveal ${direction} ${isVisible ? "visible" : ""} ${className}`}
      style={delay ? { transitionDelay: delay } : undefined}>
      {children}
    </div>
  );
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filters = [
    { id: "all", name: "All Works", emoji: "✨" },
    { id: "bridal", name: "Bridal", emoji: "👰" },
    { id: "party", name: "Party Glam", emoji: "🎉" },
    { id: "hairstyling", name: "Hair Styling", emoji: "💇" },
  ];

  const galleryImages = [
    { id: 1, src: "/gallery/bridal/image1.png", alt: "Bridal Makeup 1", category: "bridal", title: "Traditional Bridal Look", desc: "Timeless elegance for the big day" },
    { id: 2, src: "/gallery/bridal/image2.png", alt: "Bridal Makeup 2", category: "bridal", title: "Modern Bridal Makeup", desc: "Contemporary glam for modern brides" },
    { id: 3, src: "/gallery/bridal/image3.png", alt: "Bridal Makeup 3", category: "bridal", title: "Reception Makeup", desc: "Picture-perfect reception glow" },
    { id: 4, src: "/gallery/bridal/image4.png", alt: "Bridal Makeup 4", category: "bridal", title: "Elegant Bridal Look", desc: "Soft & radiant bridal beauty" },
    { id: 5, src: "/gallery/party/image1.png", alt: "Party Makeup 1", category: "party", title: "Glamorous Evening Look", desc: "Sultry & sophisticated night glam" },
    { id: 6, src: "/gallery/party/image2.png", alt: "Party Makeup 2", category: "party", title: "Cocktail Party Look", desc: "Bold and beautiful for cocktail events" },
    { id: 7, src: "/gallery/party/image3.png", alt: "Party Makeup 3", category: "party", title: "Birthday Party Glam", desc: "Celebrate in style with stunning glam" },
    { id: 8, src: "/gallery/party/image4.png", alt: "Party Makeup 4", category: "party", title: "Night Out Look", desc: "Turn heads wherever you go" },
    { id: 9, src: "/gallery/hairstyling/image1.png", alt: "Hair Styling 1", category: "hairstyling", title: "Elegant Hair Styling", desc: "Sleek and polished perfection" },
    { id: 10, src: "/gallery/hairstyling/image2.png", alt: "Hair Styling 2", category: "hairstyling", title: "Bridal Hair Styling", desc: "Dreamy bridal hair design" },
    { id: 11, src: "/gallery/hairstyling/image3.png", alt: "Hair Styling 3", category: "hairstyling", title: "Vintage Hair Style", desc: "Classic retro-inspired hairdo" },
    { id: 12, src: "/gallery/hairstyling/image4.png", alt: "Hair Styling 4", category: "hairstyling", title: "Modern Updo", desc: "Clean and chic updo styling" },
  ];

  const filteredImages = activeFilter === "all" ? galleryImages : galleryImages.filter((img) => img.category === activeFilter);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goPrev = () => setSelectedIndex((p) => (p !== null ? (p - 1 + filteredImages.length) % filteredImages.length : null));
  const goNext = () => setSelectedIndex((p) => (p !== null ? (p + 1) % filteredImages.length : null));

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 animate-hero-bg" style={{ backgroundImage: `url(${heroGallery})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-hero-title">Our Portfolio</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 animate-hero-subtitle">
            Discover our stunning transformations and beauty creations
          </p>
          <Badge variant="outline" className="text-white border-white px-4 py-2 animate-hero-badge">
            <Eye className="w-4 h-4 mr-2" />
            500+ Happy Clients
          </Badge>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <Reveal direction="from-bottom">
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <div className="flex items-center mr-2 text-muted-foreground">
                <Filter className="h-5 w-5 mr-2" />
                <span className="font-medium text-sm">Filter by:</span>
              </div>
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border-2 ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent shadow-md scale-105"
                      : "bg-white text-foreground border-pink-200 hover:border-pink-400 hover:bg-pink-50"
                  }`}
                >
                  {filter.emoji} {filter.name}
                </Button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredImages.map((image, index) => (
              <Reveal key={image.id} direction={index % 2 === 0 ? "from-left" : "from-right"} delay={`${(index % 4) * 0.07}s`}>
                <div className="group cursor-pointer" onClick={() => openLightbox(index)}>
                  <Card className="border-2 border-pink-200 bg-white shadow-[0_4px_16px_rgba(236,72,153,0.10)] hover:shadow-[0_8px_32px_rgba(236,72,153,0.22)] hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden p-0">
                    <div className="relative overflow-hidden">
                      <AspectRatio ratio={3 / 4} className="bg-pink-50">
                        <img
                          src={image.src} alt={image.alt} loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-400"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <p className="text-white font-semibold text-sm leading-tight">{image.title}</p>
                        <p className="text-white/80 text-xs mt-0.5">{image.desc}</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                          <Eye className="h-4 w-4 text-pink-500" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="font-medium text-sm truncate">{image.title}</p>
                      <Badge className="mt-1 bg-pink-50 text-pink-600 border-pink-200 text-xs capitalize">{image.category === "hairstyling" ? "Hair" : image.category}</Badge>
                    </CardContent>
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={filteredImages[selectedIndex].src} alt={filteredImages[selectedIndex].alt} className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg shadow-2xl" />
            <div className="mt-4 text-center text-white">
              <p className="font-playfair text-xl font-semibold">{filteredImages[selectedIndex].title}</p>
              <p className="text-gray-400 text-sm mt-1">{filteredImages[selectedIndex].desc}</p>
            </div>
            <button onClick={closeLightbox} className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full p-2 transition-colors" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full p-3 transition-colors" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full p-3 transition-colors" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
            <p className="text-white/50 text-xs text-center mt-3">{selectedIndex + 1} / {filteredImages.length}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <Reveal direction="from-bottom">
        <section className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Ready to Be Our Next Success Story?</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of satisfied clients who trust us with their most special moments
            </p>
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-10 py-6 text-base hover:scale-105 transition-transform" asChild>
              <Link to="/contact">Book Your Session Today</Link>
            </Button>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default Gallery;
