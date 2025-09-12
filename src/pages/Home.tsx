import { Link } from "react-router-dom";
import { Star, ArrowRight, CheckCircle, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-bride.jpg";

const Home = () => {
  const services = [
    {
      name: "Bridal Makeup",
      price: "₹15,000",
      duration: "4-5 hours",
      description: "Complete bridal transformation with premium products",
      image: "/api/placeholder/300/200"
    },
    {
      name: "Party Makeup",
      price: "₹3,500",
      duration: "2 hours",
      description: "Glamorous looks for special occasions",
      image: "/api/placeholder/300/200"
    },
    {
      name: "Hair Styling",
      price: "₹2,500",
      duration: "1.5 hours",
      description: "Professional hair styling and treatments",
      image: "/api/placeholder/300/200"
    }
  ];

  const features = [
    { icon: Award, title: "5+ Years Experience", description: "Trusted by 500+ brides" },
    { icon: Users, title: "Expert Team", description: "Certified makeup artists" },
    { icon: CheckCircle, title: "Premium Products", description: "High-end brands only" },
    { icon: Clock, title: "Timely Service", description: "Always on schedule" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      text: "Firdaus made my wedding day absolutely perfect! The makeup was flawless and lasted all day.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Anjali Mehta",
      text: "Amazing service for my sister's engagement. Everyone was asking about her makeup artist!",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Sneha Patel",
      text: "Professional, punctual, and absolutely talented. Highly recommended!",
      rating: 5,
      image: "/api/placeholder/60/60"
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Bridal Makeover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Welcome to <span className="text-primary-glow">Firdaus Makeover</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Where Beauty Meets Elegance
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-300">
              Transform your special moments with our premium beauty services. 
              Expert bridal makeup, party looks, and beauty treatments that make you shine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Book Appointment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-white border-white hover:bg-white hover:text-black">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-card gradient-card">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full gradient-hero w-fit">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-playfair text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our range of premium beauty services designed to enhance your natural beauty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20" />
              <CardHeader>
                <CardTitle className="font-playfair text-xl">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  <span className="text-muted-foreground">{service.duration}</span>
                </div>
                <Button className="w-full" variant="premium">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">About Firdaus Makeover</h2>
              <p className="text-lg text-muted-foreground mb-6">
                With over 5 years of experience in the beauty industry, Firdaus Makeover has been 
                the trusted choice for brides and beauty enthusiasts across the city.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We believe that every woman deserves to feel beautiful and confident. Our team of 
                certified makeup artists uses only premium products to create looks that enhance 
                your natural beauty and make you shine on your special day.
              </p>
              <Button variant="default" size="lg" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">
            Don't just take our word for it - hear from our happy clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-card gradient-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full" />
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic text-center">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Look?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Book your appointment today and let us make you look and feel absolutely gorgeous
          </p>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary" asChild>
            <Link to="/contact">Book Your Session Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;