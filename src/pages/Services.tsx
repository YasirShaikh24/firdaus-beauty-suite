import { useState } from "react";
import { Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Services" },
    { id: "bridal", name: "Bridal" },
    { id: "party", name: "Party" },
    { id: "hair", name: "Hair" },
    { id: "skin", name: "Skin Care" }
  ];

  const services = [
    {
      id: 1,
      name: "Complete Bridal Package",
      category: "bridal",
      price: "₹25,000",
      duration: "6-8 hours",
      rating: 5,
      description: "Full bridal transformation including makeup, hair styling, draping, and mehendi",
      features: ["HD Makeup", "Hair Styling", "Saree Draping", "Mehendi", "Touch-ups"],
      popular: true
    },
    {
      id: 2,
      name: "Engagement Makeup",
      category: "bridal",
      price: "₹12,000",
      duration: "3-4 hours",
      rating: 5,
      description: "Elegant makeup for engagement ceremonies with hair styling",
      features: ["Premium Makeup", "Hair Styling", "Jewelry Setting", "Photo-ready finish"]
    },
    {
      id: 3,
      name: "Party Makeup",
      category: "party",
      price: "₹3,500",
      duration: "2 hours",
      rating: 4.9,
      description: "Glamorous party looks for special occasions and events",
      features: ["Evening Makeup", "Party Hair", "Contouring", "Long-lasting finish"]
    },
    {
      id: 4,
      name: "Reception Makeup",
      category: "party",
      price: "₹8,500",
      duration: "3 hours",
      rating: 5,
      description: "Sophisticated makeup for wedding receptions",
      features: ["Elegant Makeup", "Hair Styling", "Draping Assistance", "Touch-ups"]
    },
    {
      id: 5,
      name: "Hair Styling & Treatment",
      category: "hair",
      price: "₹2,500",
      duration: "1.5 hours",
      rating: 4.8,
      description: "Professional hair styling with nourishing treatments",
      features: ["Hair Wash", "Deep Conditioning", "Styling", "Heat Protection"]
    },
    {
      id: 6,
      name: "Bridal Hair Package",
      category: "hair",
      price: "₹5,000",
      duration: "3 hours",
      rating: 5,
      description: "Complete bridal hair transformation with traditional styling",
      features: ["Hair Treatment", "Traditional Styling", "Hair Accessories", "Long-lasting hold"]
    },
    {
      id: 7,
      name: "Facial Treatment",
      category: "skin",
      price: "₹2,000",
      duration: "1 hour",
      rating: 4.7,
      description: "Deep cleansing facial for glowing, healthy skin",
      features: ["Deep Cleansing", "Exfoliation", "Moisturizing", "Glow Enhancement"]
    },
    {
      id: 8,
      name: "Pre-Bridal Skin Care",
      category: "skin",
      price: "₹15,000",
      duration: "Multiple sessions",
      rating: 5,
      description: "Complete skin preparation package for brides (4 sessions)",
      features: ["4 Facial Sessions", "Skin Analysis", "Custom Treatment", "Home Care Kit"]
    }
  ];

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Discover our comprehensive range of beauty services designed to make you look and feel absolutely stunning
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "premium" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="transition-all duration-300"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 relative">
              {service.popular && (
                <Badge className="absolute top-4 right-4 z-10 gradient-hero text-white">
                  Most Popular
                </Badge>
              )}
              
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20" />
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-playfair text-xl mb-2">{service.name}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
                        {service.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{service.price}</p>
                  </div>
                </div>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Includes:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button variant="premium" className="w-full" asChild>
                    <Link to="/contact">
                      Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

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