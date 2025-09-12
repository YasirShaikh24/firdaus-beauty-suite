import { Award, Users, Clock, Heart, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { icon: Users, number: "500+", label: "Happy Clients" },
    { icon: Award, number: "5+", label: "Years Experience" },
    { icon: Star, number: "4.9", label: "Average Rating" },
    { icon: CheckCircle, number: "100%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Beauty",
      description: "We are passionate about enhancing natural beauty and making every client feel confident and beautiful."
    },
    {
      icon: Award,
      title: "Excellence in Service",
      description: "We strive for excellence in every service we provide, using only premium products and techniques."
    },
    {
      icon: Users,
      title: "Client-Centered Approach",
      description: "Our clients are at the heart of everything we do. We listen, understand, and deliver personalized solutions."
    },
    {
      icon: Clock,
      title: "Reliability & Punctuality",
      description: "We value your time and ensure timely, professional service for all your beauty needs."
    }
  ];

  const teamMembers = [
    {
      name: "Firdaus Khan",
      role: "Founder & Lead Makeup Artist",
      experience: "5+ Years",
      specialization: "Bridal Makeup & Hair Styling",
      image: "/api/placeholder/300/300",
      certifications: ["MAC Certified", "Lakme Academy", "VLCC Institute"]
    },
    {
      name: "Ayesha Patel",
      role: "Senior Makeup Artist",
      experience: "3+ Years",
      specialization: "Party & Fashion Makeup",
      image: "/api/placeholder/300/300",
      certifications: ["Makeup Studio", "Kryolan Certified"]
    },
    {
      name: "Priya Sharma",
      role: "Hair Stylist",
      experience: "4+ Years",
      specialization: "Bridal Hair & Traditional Styles",
      image: "/api/placeholder/300/300",
      certifications: ["Schwarzkopf Academy", "Wella Professional"]
    }
  ];

  return (
    <div className="space-y-20">
      {/* Header */}
      <section className="gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">About Firdaus Makeover</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Where Beauty Meets Elegance - Your Trusted Beauty Destination Since 2019
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Firdaus Makeover was born from a simple belief: every woman deserves to feel beautiful and confident. 
                Founded in 2019 by Firdaus Khan, a passionate makeup artist with a vision to transform lives through beauty.
              </p>
              <p>
                What started as a small home-based service has grown into one of the city's most trusted beauty destinations. 
                We've had the privilege of being part of over 500 special moments, from intimate engagements to grand weddings.
              </p>
              <p>
                Our journey has been built on trust, excellence, and an unwavering commitment to making every client look 
                and feel their absolute best. We don't just apply makeup; we create transformations that boost confidence 
                and create lasting memories.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg" />
            <Badge className="absolute -top-4 -right-4 gradient-hero text-white px-4 py-2">
              Since 2019
            </Badge>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="gradient-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-muted-foreground">Numbers that speak for our excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-background shadow-elegant">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 rounded-full gradient-hero w-fit">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="font-playfair text-3xl font-bold text-primary">
                    {stat.number}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The principles that guide everything we do and every service we provide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full gradient-hero">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="font-playfair text-xl">{value.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="gradient-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              Our certified and experienced beauty professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 bg-background shadow-elegant overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20" />
                <CardHeader>
                  <CardTitle className="font-playfair text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-semibold">{member.role}</p>
                  <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                    <span>{member.experience}</span>
                    <span>•</span>
                    <span>{member.specialization}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-foreground">Certifications:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.certifications.map((cert, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Experience the Firdaus Difference</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join our family of satisfied clients and discover why we're the trusted choice for beauty transformations
          </p>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary" asChild>
            <Link to="/contact">Book Your Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;