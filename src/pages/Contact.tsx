import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send, MessageCircle, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: ""
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Salon",
      details: ["123 Beauty Street", "Fashion District", "City - 400001"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 87991 32161", "+91 87991 32161 (WhatsApp)"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["yasirazimshaikh5440@gmail.com", "bookings@firdausmakeover.com"],
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 10 AM - 8 PM", "Sunday: 11 AM - 6 PM"],
      action: "Book Now"
    }
  ];

  const quickContacts = [
    {
      icon: Phone,
      label: "Call",
      href: "tel:+918799132161",
      className: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/918799132161",
      className: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/yasir_shaikh_24",
      className: "bg-pink-500 hover:bg-pink-600"
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "#",
      className: "bg-blue-500 hover:bg-blue-600"
    }
  ];

  const services = [
    "Bridal Makeup",
    "Engagement Makeup",
    "Party Makeup",
    "Hair Styling",
    "Skin Treatment",
    "Complete Package",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.service) {
      toast({
        title: "Please fill required fields",
        description: "Name, phone, and service are required.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Booking Request Sent!",
      description: "We'll contact you within 2 hours to confirm your appointment.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Ready to transform your look? We're here to make your beauty dreams come true
          </p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold mb-4">Quick Contact</h2>
          <p className="text-xl text-muted-foreground">Choose your preferred way to reach us</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {quickContacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center space-x-3 px-6 py-3 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${contact.className}`}
            >
              <contact.icon className="h-5 w-5" />
              <span className="font-medium">{contact.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-primary" />
                Book Your Appointment
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 2 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 87991 32161"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="yasirazimshaikh5440@gmail.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Required *</Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your requirements, event details, or any special requests..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Booking Request
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * Required fields. We'll contact you within 2 hours to confirm your appointment.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <div className="p-2 rounded-full gradient-hero mr-3">
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Find Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-primary mb-2" />
                    <p className="text-muted-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">123 Beauty Street, Fashion District</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="gradient-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 bg-background shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">How far in advance should I book?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For bridal services, we recommend booking 2-3 months in advance. For party makeup, 1-2 weeks is sufficient.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Do you provide trials?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer makeup trials for bridal packages. Trial sessions are charged separately and can be adjusted from the final package cost.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">What products do you use?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We use premium brands like MAC, Urban Decay, NARS, and other high-end professional makeup products for long-lasting results.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Do you travel to venues?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we provide on-location services within the city. Travel charges may apply based on distance and timing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;