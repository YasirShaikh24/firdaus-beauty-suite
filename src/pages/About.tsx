import { Award, Users, Clock, Heart, Star, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroAbout from "@/assets/hero-about.jpg";
import trophyImage from "@/assets/trophy-award.jpg";
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

const About = () => {
  const stats = [
    { icon: Users, number: "500+", label: "Happy Clients", desc: "Brides, parties & events" },
    { icon: Award, number: "5+", label: "Years Experience", desc: "Trusted beauty studio" },
    { icon: Star, number: "4.9", label: "Average Rating", desc: "Consistently excellent" },
    { icon: CheckCircle, number: "100%", label: "Satisfaction Rate", desc: "Every client leaves happy" },
  ];

  const values = [
    { icon: Heart, title: "Passion for Beauty", description: "We are deeply passionate about enhancing natural beauty and making every client feel radiant, confident and absolutely stunning." },
    { icon: Award, title: "Excellence in Service", description: "We strive for excellence in every service — from consultation to final reveal — using only premium professional-grade products." },
    { icon: Users, title: "Client-Centered Approach", description: "Our clients are the heart of everything we do. We listen carefully, understand your vision, and craft personalized solutions." },
    { icon: Clock, title: "Reliability & Punctuality", description: "We value your time and occasion. Expect professional, on-time service whether at our studio or your venue." },
  ];

  const timeline = [
    { year: "2019", event: "Firdaus Makeover Founded", desc: "Started as a home-based beauty service with a passion for bridal makeup." },
    { year: "2020", event: "First 100 Happy Clients", desc: "Word spread fast — brides and party-goers kept coming back." },
    { year: "2022", event: "Studio Launch", desc: "Opened a dedicated studio in Valsad with full professional setup." },
    { year: "2023", event: "Award Winning", desc: "Received the prestigious 'Best Makeover Artist' award in the region." },
    { year: "2024", event: "500+ Clients Milestone", desc: "Crossed 500 happy transformations and counting!" },
  ];

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 animate-hero-bg" style={{ backgroundImage: `url(${heroAbout})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-hero-title">About Firdaus Makeover</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-hero-subtitle">
            Where Beauty Meets Elegance — Your Trusted Beauty Destination
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal direction="from-left">
              <div>
                <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200 px-4 py-1.5">Our Journey</Badge>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p className="text-lg">Firdaus Makeover was born from a simple but powerful belief: <strong className="text-foreground">every woman deserves to feel beautiful and confident</strong>. Founded by Firdaus Khan, a passionate and award-winning makeup artist with a vision to transform lives through beauty.</p>
                  <p>What started as a small home-based service in Valsad has grown into one of the city's most trusted and sought-after beauty studios. We've had the privilege of being part of over 500 special moments — from intimate engagements to grand weddings.</p>
                  <p>Recognized for excellence in the beauty industry, Firdaus Makeover was honored with the <strong className="text-foreground">"Best Makeover Artist" award</strong> — a testament to our dedication, artistry, and unwavering commitment to perfection.</p>
                  <p>We don't just apply makeup; we create transformations that boost confidence and create memories that last a lifetime.</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Award-Winning Studio", "Premium Products", "Bridal Specialists", "On-Location Services"].map((tag) => (
                    <Badge key={tag} className="bg-pink-50 text-pink-700 border-pink-200 px-3 py-1">{tag}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal direction="from-right">
              <div className="relative">
                <img src={trophyImage} alt="Best Makeover Artist Award" className="w-full h-auto object-cover rounded-3xl shadow-[0_20px_60px_rgba(236,72,153,0.20)] border-2 border-pink-200" />
                <div className="absolute -bottom-4 -left-4 bg-white border-2 border-pink-200 rounded-2xl px-5 py-3 shadow-lg">
                  <p className="font-playfair font-bold text-primary text-sm">🏆 Best Makeover Artist</p>
                  <p className="text-xs text-muted-foreground">Regional Beauty Awards</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
        <div className="container mx-auto px-4">
          <Reveal direction="from-bottom">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200 px-4 py-1.5">By The Numbers</Badge>
              <h2 className="font-playfair text-4xl font-bold mb-4">Our Achievements</h2>
              <p className="text-xl text-muted-foreground">Numbers that speak for our dedication and excellence</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Reveal key={index} direction="bump" delay={`${index * 0.1}s`}>
                <Card className="text-center border-2 border-pink-200 bg-white shadow-[0_4px_24px_rgba(236,72,153,0.12)] hover:shadow-[0_10px_36px_rgba(236,72,153,0.22)] hover:-translate-y-1 transition-all duration-300 h-full rounded-2xl">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 w-fit shadow-md">
                      <stat.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="font-playfair text-4xl font-bold text-primary">{stat.number}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-foreground">{stat.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal direction="from-bottom">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200 px-4 py-1.5">Our Growth</Badge>
              <h2 className="font-playfair text-4xl font-bold mb-4">The Firdaus Journey</h2>
              <p className="text-xl text-muted-foreground">From a home studio to award-winning beauty destination</p>
            </div>
          </Reveal>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <Reveal key={i} direction={i % 2 === 0 ? "from-left" : "from-right"} delay={`${i * 0.1}s`}>
                <div className="flex gap-6 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-xs shadow-md flex-shrink-0">
                      {item.year}
                    </div>
                    {i < timeline.length - 1 && <div className="w-0.5 h-10 bg-pink-200 mt-2" />}
                  </div>
                  <Card className="flex-1 border-2 border-pink-100 bg-pink-50/50 shadow-sm hover:shadow-[0_4px_20px_rgba(236,72,153,0.12)] transition-all duration-300 rounded-xl mb-0">
                    <CardContent className="py-4 px-5">
                      <h3 className="font-playfair font-bold text-base text-primary mb-1">{item.event}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4">
          <Reveal direction="from-bottom">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200 px-4 py-1.5">What We Stand For</Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">The principles that guide every brushstroke and every client interaction</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Reveal key={index} direction={index % 2 === 0 ? "from-left" : "from-right"} delay={`${index * 0.1}s`}>
                <Card className="border-2 border-pink-200 bg-white shadow-[0_4px_24px_rgba(236,72,153,0.10)] hover:shadow-[0_10px_36px_rgba(236,72,153,0.20)] hover:-translate-y-1 transition-all duration-300 h-full rounded-2xl">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-md flex-shrink-0">
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="font-playfair text-xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
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
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Experience the Firdaus Difference</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join our family of satisfied clients and discover why we're Valsad's most trusted beauty studio
            </p>
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-10 py-6 text-base hover:scale-105 transition-transform" asChild>
              <Link to="/contact">Book Your Consultation</Link>
            </Button>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default About;
