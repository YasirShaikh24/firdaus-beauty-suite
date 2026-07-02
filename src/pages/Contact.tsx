import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Send, MessageCircle, User, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import heroContact from "@/assets/hero-contact.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Reveal = ({
  children,
  direction = "from-bottom",
  delay = "",
  className = "",
}: {
  children: React.ReactNode;
  direction?: "from-left" | "from-right" | "from-bottom" | "bump";
  delay?: string;
  className?: string;
}) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`reveal ${direction} ${isVisible ? "visible" : ""} ${className}`}
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {children}
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "",
    date: "", hour: "", minute: "", period: "AM", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: [
        "Mission Colony, Next to Shiraz Dairy,",
        "Near CB High School, Halar Road,",
        "Valsad - 396001"
      ],
      action: "Get Directions",
      href: "https://maps.google.com/?q=Shiraz+Dairy,+Mission+Colony,+Near+CB+High+School,+Halar+Road,+Valsad,+Gujarat+396001"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 84010 50169"],
      action: "Call Now",
      href: "tel:8401050169"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["firdauspathan47@gmail.com"],
      action: "Email Us",
      href: "mailto:firdauspathan47@gmail.com"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 10 AM - 8 PM", "Sunday: 11 AM - 6 PM"],
      action: "Book Now",
      href: "#booking-form"
    }
  ];

  const quickContacts = [
    { icon: Phone, label: "Call Now", href: "tel:8401050169", className: "bg-green-500 hover:bg-green-600" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/918401050169", className: "bg-green-600 hover:bg-green-700" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/firdaus_makeover?igsh=MXJlemE0aWZoMzAxaw==", className: "bg-pink-500 hover:bg-pink-600" },
    { icon: Mail, label: "Email Us", href: "mailto:firdauspathan47@gmail.com", className: "bg-blue-500 hover:bg-blue-600" }
  ];

  const services = ["Bridal Makeup", "Engagement Makeup", "Party Makeup", "Hair Styling", "Skin Treatment", "Complete Package", "Other"];
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.hour || !formData.minute) {
      toast({ title: "Please fill required fields", description: "Name, phone, service, date, and time are required.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const [year, month, day] = formData.date.split("-");
      const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const formattedDate = `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${year}`;
      const formattedTime = `${formData.hour}:${formData.minute} ${formData.period}`;

      const message =
        `*✨ NEW APPOINTMENT REQUEST - Firdaus Makeover ✨*\n\n` +
        `*Name:* ${formData.name}\n*Service:* ${formData.service}\n*Date:* ${formattedDate}\n` +
        `*Time:* ${formattedTime}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || "N/A"}\n` +
        `*Notes:* ${formData.message || "None"}\n\nPlease confirm this booking at your earliest convenience.`;

      toast({ title: "Opening WhatsApp...", description: "Your booking request is ready to send!" });
      setTimeout(() => window.open(`https://wa.me/918401050169?text=${encodeURIComponent(message)}`, "_blank"), 500);

      setFormData({ name: "", email: "", phone: "", service: "", date: "", hour: "", minute: "", period: "AM", message: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 animate-hero-bg" style={{ backgroundImage: `url(${heroContact})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-hero-title">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-hero-subtitle">
            Ready to transform your look? We're here to make your beauty dreams come true
          </p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="container mx-auto px-4">
          <Reveal direction="from-bottom">
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-pink-100 text-pink-700 border-pink-200 px-4 py-1.5">Quick Reach</Badge>
              <h2 className="font-playfair text-3xl font-bold mb-2">Quick Contact</h2>
              <p className="text-muted-foreground">Choose your preferred way to reach us instantly</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {quickContacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex items-center space-x-3 px-7 py-3.5 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium ${contact.className}`}
                >
                  <contact.icon className="h-5 w-5" />
                  <span>{contact.label}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white" id="booking-form">
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <Reveal direction="from-left">
            <Card className="border-2 border-pink-200 shadow-[0_8px_40px_rgba(236,72,153,0.14)] rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
                <Badge className="w-fit mb-2 bg-pink-100 text-pink-700 border-pink-200">Book Now</Badge>
                <CardTitle className="font-playfair text-2xl flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-primary" />
                  Book Your Appointment
                </CardTitle>
                <CardDescription>Fill out the form and we'll open WhatsApp with your details ready to send.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="name" placeholder="Your full name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="pl-10" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+91 84010 50169" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="pl-10" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="example@gmail.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="pl-10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Service Required *</Label>
                      <Select value={formData.service} onValueChange={(v) => handleInputChange("service", v)}>
                        <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                        <SelectContent>{services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input id="date" type="date" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} min={new Date().toISOString().split("T")[0]} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Time *</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Select value={formData.hour} onValueChange={(v) => handleInputChange("hour", v)}>
                        <SelectTrigger><SelectValue placeholder="Hour" /></SelectTrigger>
                        <SelectContent>{hours.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                      </Select>
                      <Select value={formData.minute} onValueChange={(v) => handleInputChange("minute", v)}>
                        <SelectTrigger><SelectValue placeholder="Minute" /></SelectTrigger>
                        <SelectContent>{minutes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                      </Select>
                      <Select value={formData.period} onValueChange={(v) => handleInputChange("period", v)}>
                        <SelectTrigger><SelectValue placeholder="AM/PM" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea id="message" placeholder="Tell us more about your requirements..." rows={4} value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Opening WhatsApp..." : <><Send className="h-4 w-4 mr-2" />Send via WhatsApp</>}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">* Required fields. Click to open WhatsApp with your booking details.</p>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          {/* Contact Info + Map */}
          <Reveal direction="from-right">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white shadow-[0_4px_20px_rgba(236,72,153,0.10)] hover:shadow-[0_8px_32px_rgba(236,72,153,0.20)] hover:-translate-y-0.5 transition-all duration-300 rounded-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 mr-3 shadow-sm">
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 mb-3">
                      {info.details.map((d, i) => <p key={i} className="text-muted-foreground">{d}</p>)}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                        {info.action}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* Real Google Map */}
              <Card className="border-2 border-pink-200 shadow-[0_4px_20px_rgba(236,72,153,0.10)] overflow-hidden rounded-xl">
                <CardHeader className="pb-2 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Find Us on Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <iframe
                    title="Firdaus Makeover Location"
                    src="https://maps.google.com/maps?q=Shiraz+Dairy,+Mission+Colony,+Near+CB+High+School,+Halar+Road,+Valsad,+Gujarat+396001&output=embed&z=16"
                    width="100%"
                    height="320"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="p-4 bg-gray-50 border-t">
                    <p className="text-sm font-medium text-gray-800">📍 Mission Colony, Next to Shiraz Dairy,</p>
                    <p className="text-sm text-gray-600">Near CB High School, Halar Road, Valsad - 396001</p>
                    <a
                      href="https://maps.google.com/?q=Shiraz+Dairy,+Mission+Colony,+Near+CB+High+School,+Halar+Road,+Valsad,+Gujarat+396001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-pink-600 hover:text-pink-700 font-medium hover:underline"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
        <div className="container mx-auto px-4">
          <Reveal direction="from-bottom">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200 px-4 py-1.5">FAQ</Badge>
              <h2 className="font-playfair text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">Quick answers to common questions</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "How far in advance should I book?", a: "For bridal services, we recommend booking 2–3 months in advance. For party makeup, 1–2 weeks is usually sufficient." },
              { q: "Do you provide makeup trials?", a: "Yes! We offer makeup trials for bridal packages. Trial sessions are charged separately and can be adjusted from the final package cost." },
              { q: "What products do you use?", a: "We use premium brands like MAC, Urban Decay, NARS, and other high-end professional products for long-lasting, flawless results." },
              { q: "Do you travel to venues?", a: "Yes, we provide on-location services for weddings and events. Travel charges may apply based on distance and timing." },
              { q: "Do you offer group bookings?", a: "Absolutely! We offer special group packages for bridal parties, families and events. Contact us to discuss your requirements." },
              { q: "What is your cancellation policy?", a: "We request 48 hours notice for cancellations. For bridal bookings, please review our package terms at the time of booking." },
            ].map((faq, index) => (
              <Reveal key={index} direction={index % 2 === 0 ? "from-left" : "from-right"} delay={`${index * 0.08}s`}>
                <Card className="border-2 border-pink-200 bg-white shadow-[0_4px_20px_rgba(236,72,153,0.10)] hover:shadow-[0_8px_28px_rgba(236,72,153,0.18)] hover:-translate-y-0.5 transition-all duration-300 rounded-xl h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-foreground flex items-start gap-2">
                      <span className="text-pink-500 text-lg flex-shrink-0">?</span>
                      {faq.q}
                    </CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p></CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Reveal direction="from-bottom">
        <section className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Your Dream Look Awaits</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Don't wait — book your session today and let us create something beautiful together
            </p>
            <a href="https://wa.me/918401050169" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-pink-600 hover:bg-pink-50 font-semibold px-10 py-4 rounded-full text-base hover:scale-105 transition-transform shadow-lg">
              Chat on WhatsApp Now →
            </a>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default Contact;
