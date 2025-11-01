import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Firdaus Makeover" className="h-12 w-12" />
              <div>
                <h3 className="font-playfair font-bold text-xl text-primary">FIRDAUS</h3>
                <p className="font-playfair text-sm text-muted-foreground -mt-1">MAKEOVER</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Where Beauty Meets Elegance. Your premier destination for bridal makeup, party looks, and beauty transformations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-4 text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/gallery" className="block text-muted-foreground hover:text-primary transition-colors">Portfolio</Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-4 text-foreground">Our Services</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground">Bridal Makeup</p>
              <p className="text-muted-foreground">Party Makeup</p>
              <p className="text-muted-foreground">Hair Styling</p>
              <p className="text-muted-foreground">Skin Treatments</p>
              <p className="text-muted-foreground">Mehendi</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-4 text-foreground">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground text-sm">
                  123 Beauty Street, Fashion District, City - 400001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:8799132161" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 87991 32161
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:yasirazimshaikh5440@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  yasirazimshaikh5440@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  <p>Mon - Sat: 10 AM - 8 PM</p>
                  <p>Sunday: 11 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/yasir_shaikh_24" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Firdaus Makeover. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;