import { Link } from "react-router-dom";
import {
  Star, ArrowRight, CheckCircle, Users, Award, Clock,
  Sparkles, Crown, Heart, Scissors, Palette, Eye,
  ShieldCheck, Gift, Zap, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-bride.jpg";
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

const Home = () => {
  const features = [
    { icon: Award, title: "Award Winning", description: "Recognized as Best Makeover Artist in the region", badge: "🏆 Top Rated" },
    { icon: Users, title: "500+ Happy Brides", description: "Trusted by hundreds of brides for their special day", badge: "💍 Bridal Expert" },
    { icon: ShieldCheck, title: "Premium Products", description: "MAC, NARS, Urban Decay & top professional brands", badge: "✨ Luxury Brands" },
    { icon: Clock, title: "Always On Time", description: "Punctual professional service you can rely on", badge: "⏰ Punctual" },
  ];

  const services = [
    {
      icon: Crown, title: "Bridal Makeup",
      description: "Complete bridal transformation with airbrush finish, contouring, and long-lasting setting for your wedding day.",
      features: ["Pre-bridal consultation", "Trial session available", "HD airbrush finish", "All-day hold guaranteed"],
      color: "from-pink-500 to-rose-600", bg: "bg-pink-50", border: "border-pink-200"
    },
    {
      icon: Sparkles, title: "Party & Glam Makeup",
      description: "Stand out at every occasion — cocktail nights, birthdays, receptions, and evening events.",
      features: ["Smokey eye expertise", "Glitter & shimmer looks", "Bold lip artistry", "Contouring & highlighting"],
      color: "from-fuchsia-500 to-pink-500", bg: "bg-fuchsia-50", border: "border-fuchsia-200"
    },
    {
      icon: Scissors, title: "Hair Styling",
      description: "From traditional updos to modern blowouts — hair styling that perfectly complements your look.",
      features: ["Bridal hair styling", "Updos & buns", "Braids & plaiting", "Heat styling & curls"],
      color: "from-rose-500 to-pink-400", bg: "bg-rose-50", border: "border-rose-200"
    },
    {
      icon: Palette, title: "Engagement Makeup",
      description: "Make your engagement day unforgettable with a radiant, picture-perfect makeup look.",
      features: ["Soft glam looks", "Natural dewy finish", "Eye makeup artistry", "Lip perfection"],
      color: "from-pink-400 to-fuchsia-500", bg: "bg-pink-50", border: "border-pink-200"
    },
    {
      icon: Heart, title: "Skin & Face Treatments",
      description: "Pre-event skin care treatments to give you a glowing, flawless base before any occasion.",
      features: ["Face cleanup & glow", "Waxing & threading", "Eyebrow shaping", "Skin brightening"],
      color: "from-rose-400 to-pink-500", bg: "bg-rose-50", border: "border-rose-200"
    },
    {
      icon: Eye, title: "Mehendi & Bridal Packages",
      description: "Complete bridal packages including mehendi, hair, makeup and full day coverage.",
      features: ["Full bridal package", "Mehendi design", "Hairstyling included", "Group bookings available"],
      color: "from-fuchsia-400 to-rose-500", bg: "bg-fuchsia-50", border: "border-fuchsia-200"
    },
  ];

  const testimonials = [
    { name: "Priya Sharma", event: "Bride – June 2024", text: "Firdaus made my wedding day absolutely magical! My makeup stayed flawless from the ceremony to the reception. Every guest complimented my look!", rating: 5, avatar: "PS" },
    { name: "Anjali Mehta", event: "Engagement – April 2024", text: "I had my engagement makeup done here and it was beyond my expectations. The attention to detail is incredible. I felt like a queen!", rating: 5, avatar: "AM" },
    { name: "Sneha Patel", event: "Party Makeup – 2024", text: "Professional, punctual, and absolutely talented. The makeup lasted 10+ hours! I've found my go-to beauty artist. Highly recommend!", rating: 5, avatar: "SP" },
    { name: "Zara Khan", event: "Bridal – March 2024", text: "Best bridal experience ever! Firdaus understood exactly what I wanted and delivered a look that was even better than I imagined.", rating: 5, avatar: "ZK" },
    { name: "Meera Joshi", event: "Reception Makeup", text: "The bridal package was worth every penny. Hair, makeup, mehendi — all perfectly coordinated. My photos look stunning!", rating: 5, avatar: "MJ" },
    { name: "Fatima Sheikh", event: "Birthday Party Glam", text: "Booked for my 30th birthday party and got so many compliments! The team was friendly, professional and super talented.", rating: 5, avatar: "FS" },
  ];

  const whyUs = [
    { icon: Zap, title: "Quick & Efficient", desc: "We value your time — fast prep without compromising quality" },
    { icon: Gift, title: "Affordable Packages", desc: "Premium service at prices that work for every budget" },
    { icon: ShieldCheck, title: "Hygienic Practices", desc: "All tools sanitized, premium quality products only" },
    { icon: Heart, title: "Personalized Touch", desc: "Every look is custom-crafted to suit your face & event" },
  ];

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImage} alt="Bridal Makeover" className="w-full h-full object-cover animate-hero-bg" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-hero-title">
              Welcome to <span className="text-primary-glow">Firdaus Makeover</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-200 animate-hero-subtitle">Where Beauty Meets Elegance</p>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-300 animate-hero-text">
              Transform your special moments with our premium beauty services. Expert bridal makeup, party looks, and beauty treatments that make you shine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-hero-buttons">
              <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform duration-200">
                <Link to="/contact">Book Appointment <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-black bg-white border-white hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                <Link to="/gallery">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US — Feature Strip ═══ */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
        <div className="container mx-auto px-4">
          <Reveal direction="from-bottom">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Why Choose Firdaus Makeover?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We bring artistry, precision and passion to every look we create</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Reveal key={index} direction="bump" delay={`${index * 0.1}s`}>
                <Card className="text-center border border-pink-200 bg-white shadow-[0_4px_20px_rgba(236,72,153,0.12)] hover:shadow-[0_8px_30px_rgba(236,72,153,0.22)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 h-full rounded-2xl overflow-hidden">
                  <CardHeader className="pb-2">
                    <Badge className="mx-auto mb-3 bg-pink-100 text-pink-700 border-pink-200 text-xs font-medium">{feature.badge}</Badge>
                    <div className="mx-auto mb-3 p-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 w-fit shadow-md">
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="font-playfair text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR SERVICES ═══ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal direction="from-bottom">
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200 px-4 py-1.5">Our Specialties</Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">What We Offer</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From bridal transformations to everyday glam — every service crafted to make you feel extraordinary
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service, index) => (
              <Reveal key={index} direction={index % 2 === 0 ? "from-left" : "from-right"} delay={`${(index % 3) * 0.1}s`}>
                <Card className={`border-2 ${service.border} ${service.bg} shadow-[0_4px_24px_rgba(236,72,153,0.10)] hover:shadow-[0_10px_40px_rgba(236,72,153,0.22)] hover:-translate-y-2 transition-all duration-300 h-full rounded-2xl overflow-hidden group`}>
                  <CardHeader className="pb-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="font-playfair text-xl mb-1">{service.title}</CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="h-4 w-4 text-pink-500 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" size="sm" className="mt-4 text-pink-600 hover:text-pink-700 hover:bg-pink-50 p-0 h-auto font-medium" asChild>
                      <Link to="/contact">Book This Service <ChevronRight className="h-4 w-4 ml-1" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal direction="from-bottom">
            <div className="text-center mt-12">
              <Button variant="hero" size="lg" asChild className="px-10">
                <Link to="/contact">Book Any Service Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ ABOUT PREVIEW ═══ */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal direction="from-left">
              <div>
                <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200 px-4 py-1.5">Our Story</Badge>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 leading-tight">About Firdaus Makeover</h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Founded by the award-winning makeup artist <strong className="text-foreground">Firdaus Khan</strong>, our studio has been the trusted beauty destination in Valsad for over 5 years.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We have had the honor of being part of 500+ special moments — intimate engagements, grand weddings, birthday celebrations, and more. Each look is crafted with precision and passion.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { num: "500+", label: "Happy Clients" },
                    { num: "5+", label: "Years Experience" },
                    { num: "4.9★", label: "Average Rating" },
                    { num: "100%", label: "Satisfaction" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-pink-200 rounded-xl p-4 text-center shadow-sm">
                      <div className="font-playfair text-2xl font-bold text-primary">{stat.num}</div>
                      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <Button variant="default" size="lg" asChild>
                  <Link to="/about">Learn More About Us <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </Reveal>
            <Reveal direction="from-right">
              <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(236,72,153,0.20)] border-2 border-pink-200">
                <video src="/Makeup.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-pink-100 shadow-lg">
                  <p className="font-playfair font-bold text-primary text-sm">🏆 Best Makeover Artist Award</p>
                  <p className="text-xs text-muted-foreground">Recognized for excellence in beauty artistry</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ QUICK WHY US STRIP ═══ */}
      <section className="py-14 bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <Reveal key={i} direction="bump" delay={`${i * 0.1}s`}>
                <div className="flex items-start gap-4 text-white">
                  <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex-shrink-0">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal direction="from-bottom">
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200 px-4 py-1.5">Client Love</Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-xl text-muted-foreground">Real stories from real brides and beauty enthusiasts</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <Reveal key={index} direction="bump" delay={`${(index % 3) * 0.12}s`}>
                <Card className="border-2 border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 shadow-[0_4px_20px_rgba(236,72,153,0.10)] hover:shadow-[0_8px_32px_rgba(236,72,153,0.20)] hover:-translate-y-1 transition-all duration-300 h-full rounded-2xl">
                  <CardContent className="pt-6">
                    {/* Stars */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-pink-500 text-pink-500" />
                      ))}
                    </div>
                    <p className="text-foreground/80 italic mb-6 leading-relaxed text-sm">"{t.text}"</p>
                    <div className="flex items-center gap-3 border-t border-pink-100 pt-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.event}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <Reveal direction="from-bottom">
        <section className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-16 text-8xl">✨</div>
            <div className="absolute bottom-8 right-16 text-8xl">👑</div>
            <div className="absolute top-12 right-1/3 text-6xl">💄</div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6">Ready to Look Absolutely Stunning?</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Book your appointment today and experience the Firdaus Makeover difference. Your dream look awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-10 py-6 text-base hover:scale-105 transition-transform" asChild>
                <Link to="/contact">Book Your Session Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/60 text-white bg-white/10 hover:bg-white/20 px-10 py-6 text-base" asChild>
                <a href="https://wa.me/918401050169" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default Home;
