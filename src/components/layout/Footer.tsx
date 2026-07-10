import { Phone, Mail, Clock, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import firdausLogo from "/firdaus-makeover-logo.png";

const InstagramIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MAPS_URL = "https://www.google.com/maps/place/Firdaus+Makeover+Beauty+Salon/@20.601465,72.9281854,17z/data=!3m1!1e3!4m6!3m5!1s0x3be0c33a55b925f9:0x56036b572d5f5054!8m2!3d20.601465!4d72.9281854!16s%2Fg%2F11rj01k2bz";
const INSTAGRAM_URL = "https://www.instagram.com/firdaus_makeover?igsh=MXJlemE0aWZoMzAxaw==";

const Footer = () => (
  <footer className="bg-white border-t-2 border-pink-100 mt-0 relative overflow-hidden">
    {/* Decorative gradient top border */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 via-rose-400 to-fuchsia-600" />

    {/* Background decorative elements */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
      <div className="absolute top-10 left-10 text-9xl">✨</div>
      <div className="absolute top-20 right-20 text-8xl">💄</div>
      <div className="absolute bottom-20 left-1/4 text-8xl">👑</div>
      <div className="absolute bottom-10 right-10 text-8xl">🌸</div>
    </div>

    <div className="container mx-auto px-4 py-16 relative z-10">
      {/* Top tagline strip */}
      <div className="text-center mb-14 border-b border-pink-100 pb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <img src={firdausLogo} alt="Firdaus Makeover" className="h-16 w-16 rounded-full object-contain border-2 border-pink-300 shadow-md" />
          <div className="text-left">
            <h2 className="font-playfair font-bold text-3xl text-primary">FIRDAUS</h2>
            <p className="font-playfair text-lg text-pink-400 -mt-1">MAKEOVER</p>
          </div>
        </div>
        <p className="text-muted-foreground text-base max-w-md mx-auto mt-2 font-light">
          Where Beauty Meets Elegance — Valsad's Premier Beauty Studio
        </p>
        {/* Social row */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="p-3 rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] hover:scale-110 transition-transform duration-200 shadow-md">
            <InstagramIcon className="h-5 w-5 text-white" />
          </a>
          <a href="https://wa.me/918401050169" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="p-3 rounded-full bg-green-500 hover:bg-green-400 hover:scale-110 transition-all duration-200 shadow-md">
            <WhatsAppIcon className="h-5 w-5 text-white" />
          </a>
          <a href="tel:8401050169" aria-label="Call Us"
            className="p-3 rounded-full bg-pink-500 hover:bg-pink-400 hover:scale-110 transition-all duration-200 shadow-md">
            <Phone className="h-5 w-5 text-white" />
          </a>
          <a href="mailto:firdauspathan47@gmail.com" aria-label="Email Us"
            className="p-3 rounded-full bg-rose-500 hover:bg-rose-400 hover:scale-110 transition-all duration-200 shadow-md">
            <Mail className="h-5 w-5 text-white" />
          </a>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* About Column */}
        <div className="space-y-4">
          <h4 className="font-playfair font-bold text-lg text-primary mb-5 flex items-center gap-2">
            ✨ About Us
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Award-winning beauty studio specializing in bridal makeup, party glam, hair styling and skin treatments. Serving Valsad & surrounding areas.
          </p>
          <div className="space-y-2 mt-4">
            {["🏆 Best Makeover Artist Award", "⭐ 4.9/5 Rating", "👰 500+ Happy Brides", "💄 5+ Years Experience"].map((tag) => (
              <div key={tag} className="text-xs text-muted-foreground bg-pink-50 rounded-lg px-3 py-2 border border-pink-100">{tag}</div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-playfair font-bold text-lg text-primary mb-5 flex items-center gap-2">
            🔗 Quick Links
          </h4>
          <div className="space-y-3">
            {[
              { to: "/", label: "Home" },
              { to: "/gallery", label: "Portfolio / Gallery" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact Us" },
              { to: "/contact", label: "Book Appointment" },
            ].map((link) => (
              <Link key={link.label} to={link.to}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-300 group-hover:bg-pink-500 transition-colors" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-playfair font-bold text-lg text-primary mb-5">
            💅 Our Services
          </h4>
          <div className="space-y-3">
            {[
              { emoji: "👰", name: "Bridal Makeup" },
              { emoji: "💍", name: "Engagement Makeup" },
              { emoji: "🎉", name: "Party Makeup" },
              { emoji: "💇", name: "Hair Styling" },
              { emoji: "✨", name: "Skin Treatments" },
              { emoji: "🌿", name: "Mehendi" },
              { emoji: "📦", name: "Complete Packages" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm cursor-default">
                <span>{s.emoji}</span> {s.name}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-playfair font-bold text-lg text-primary mb-5">
            📞 Contact Info
          </h4>
          <div className="space-y-4">
            <a href="tel:8401050169" className="flex items-center space-x-3 group">
              <div className="p-2 rounded-lg bg-pink-50 border border-pink-200 group-hover:bg-pink-100 transition-colors">
                <Phone className="h-4 w-4 text-pink-500" />
              </div>
              <span className="text-muted-foreground text-sm group-hover:text-primary transition-colors">+91 84010 50169</span>
            </a>
            <a href="https://wa.me/918401050169" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
              <div className="p-2 rounded-lg bg-green-50 border border-green-200 group-hover:bg-green-100 transition-colors">
                <WhatsAppIcon className="h-4 w-4 text-green-500" />
              </div>
              <span className="text-muted-foreground text-sm group-hover:text-green-600 transition-colors">WhatsApp Us</span>
            </a>
            <a href="mailto:firdauspathan47@gmail.com" className="flex items-center space-x-3 group">
              <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 group-hover:bg-rose-100 transition-colors">
                <Mail className="h-4 w-4 text-rose-500" />
              </div>
              <span className="text-muted-foreground text-sm group-hover:text-primary transition-colors break-all">firdauspathan47@gmail.com</span>
            </a>
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-pink-50 border border-pink-200 flex-shrink-0">
                <Clock className="h-4 w-4 text-pink-500" />
              </div>
              <div className="text-muted-foreground text-sm">
                <p>Mon – Sat: 10 AM – 8 PM</p>
                <p>Sunday: 11 AM – 6 PM</p>
              </div>
            </div>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 group">
              <div className="p-2 rounded-lg bg-pink-50 border border-pink-200 group-hover:bg-pink-100 transition-colors flex-shrink-0">
                <MapPin className="h-4 w-4 text-pink-500" />
              </div>
              <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors leading-snug">
                Halar Rd, near Shiraz Bakery,<br />
                near Budgetlengha, Mission Colony,<br />
                Kapadia Chal, Valsad – 396001, Gujarat
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-sm text-center md:text-left">
          © {new Date().getFullYear()} <span className="text-primary font-medium">Firdaus Makeover</span>. All rights reserved.
          <span className="mx-2">·</span> Valsad, Gujarat, India
        </p>
        <p className="text-muted-foreground text-xs flex items-center gap-1">
          Made with <Heart className="h-3 w-3 text-pink-500 inline fill-pink-500" /> for beauty lovers
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
